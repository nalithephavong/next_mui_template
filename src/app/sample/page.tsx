"use client";

import { useEffect, useState } from "react";
import { 
    Container,
    Toolbar, 
    Divider
} from "@mui/material";
import Layout from "@/layouts/layout";
import CustomTable from "@/components/CustomTable";
import { 
  RowType, 
  HeaderCellType, 
  ToolbarActions, 
  UpdateType, 
  StatusType 
} from "@/templates/Interfaces";

//#region Page-Specific Settings
const sampleTableHeader: HeaderCellType[] = [
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
];

const sampleToolbarActions: ToolbarActions[] = [
  {
    name: "Add",
    title: "Create",
    description: "",
    icon: "AddIcon",
    fields: [
      { id: "id", label: "ID", type: "text" },
      { id: "name", label: "Name", type: "text" }
    ],
    callback: (param) => { 
      // This can be a call to an API

    },
    tooltip: "Add New"
  }
];

const sampleSelectedToolbarActions: ToolbarActions[] = [
  {
    name: "Update",
    title: "Update",
    description: "Update the following record(s):",
    icon: "UpdateIcon",
    fields: [],
    callback: (param) => {
      const { data, selected } = param as UpdateType;
      (selected as string[]).forEach((id) => { 
        // This can be a call to an API
      });
    },
    tooltip: "Update"
  },
  {
    name: "Delete",
    title: "Delete",
    description: "Delete the following record(s):",
    icon: "DeleteIcon",
    fields: [],
    callback: (param) => { 
      (param as string[]).forEach((id) => {
        // This can be a call to an API
      });
    },
    tooltip: "Delete"
  }
];

const sampleStatusTypes:StatusType[] = [
  {
    id: "In Process",
    label: "In Process",
    color: "info"
  },
  {
    id: "On Hold",
    label: "On Hold",
    color: "warning"
  },
  {
    id: "Canceled",
    label: "Canceled",
    color: "error"
  },
];
//#endregion

export default function SamplePage() {
  const [data, setData] = useState<RowType[] | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // This could be an API call, but use static data for now
    const initialRecords = [
        {
            date: "2023-09-01",
            id: "1",
            name: "Person 1"
        },
        {
            date: "2023-09-02",
            id: "2",
            name: "Person 2"
        }
    ];
    setData(initialRecords);

    const initialNotifications = [
        "Notification 1.",
        "Notification 2."
    ];
    setNotifications(initialNotifications);

  }, [refresh]);

  let title = "Sample Page";

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Layout title={title} notifications={notifications}>
        <Divider />
        <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <CustomTable 
              rows={data}
              headerCells={sampleTableHeader}
              toolbarActions={sampleToolbarActions}
              selectedToolbarActions={sampleSelectedToolbarActions}
              defaultOrderBy="id"
              statusOpts={sampleStatusTypes}
              componentCallback={() => {setRefresh(true);}}
            />
          </Container>
    </Layout>
  );
}