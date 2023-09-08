import * as React from 'react';
import { useState, useMemo } from "react";
import { 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  ChipPropsColorOverrides
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import { ToolbarActions, HeaderCellType, RowType, StatusType } from '@/templates/Interfaces';

//#region HELPER FUNCTIONS
type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
) : (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const getTableCells = (row:RowType, statusOpts: StatusType[]) => {
  const items = [];
  for (const key in row) {
    key == "status"? (
      items.push(<TableCell align="right" key={key}>{getRowStatus(row[key], statusOpts)}</TableCell>)
    ):(
      items.push(<TableCell align="right" key={key}>{row[key]}</TableCell>)
    )
  }
  return items;
};

const getRowStatus = (status:string, statusOpts: StatusType[]) => {
  let chipColor: OverridableStringUnion<"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ChipPropsColorOverrides> | undefined = "success";
  const statusOpt = statusOpts.find((opt) => opt.id === status);
  if (statusOpt) chipColor = statusOpt.color;

  return (
    <Chip 
      size="small" 
      label={status} 
      color={chipColor}
    />
  );
};
//#endregion

interface CustomTableProps {
  rows: RowType[];
  headerCells: HeaderCellType[];
  defaultOrderBy: string;
  toolbarActions: ToolbarActions[];
  selectedToolbarActions: ToolbarActions[];
  statusOpts: StatusType[];
  componentCallback: () => void;
}

export default function CustomTable(props:CustomTableProps) {
  const { 
    rows, 
    headerCells, 
    defaultOrderBy, 
    toolbarActions, 
    selectedToolbarActions, 
    statusOpts,
    componentCallback
  } = props;
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RowType,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property as string);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToolbarActions = () => {
    let newSelected: string[] = [];
    setSelected(newSelected);
    componentCallback();
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      rows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar 
          numSelected={selected.length} 
          title={`All Records`} 
          toolbarActions={toolbarActions} 
          selectedToolbarActions={selectedToolbarActions}
          selected={selected}
          callback={handleToolbarActions}
          statusOpts={statusOpts}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headerCells={headerCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell key="CustomCheck1" padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {
                      getTableCells(row, statusOpts)
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  key="CustomEmptyRow"
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} key="CustomEmptyCell" />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
