import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: { main: '#498FE3' },
		secondary: { main: '#782DE3' },
		error: { main: red.A400 },
	},
})

export default theme
