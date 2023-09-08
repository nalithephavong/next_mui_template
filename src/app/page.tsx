import { 
  ThemeProvider,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Button
 } from "@mui/material";
 import { 
  IcecreamOutlined as IceCreamIcon,
  ArrowCircleRight as ArrowIcon
} from "@mui/icons-material";

import defaultTheme from "@/layouts/theme";
import Copyright from "@/templates/Copyright";
import { AppConfig } from "@/templates/AppConfig";

function Index() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            //justifyContent: 'center'
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <IceCreamIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {AppConfig.title}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                }}
                href={AppConfig.landingPageRedirect}
                endIcon={<ArrowIcon />}
                size="large"
              >
                {AppConfig.landingPageButtonLabel}
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
    </ThemeProvider>
  )
}

export default Index;