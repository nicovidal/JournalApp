
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks"
import { AuthLayout } from "../layout/AuthLayout"


const formData={
  email:'nico@gmail.com',
  password:'123456',
  displayName:'Nicolas Vidal',
}

const formValidations={
  email:[(value)=>value.includes('@'),'El email debe de tener una @'],
  password:[(value)=>value.length >=6,'El password debe tener mas de 6 letras'],
  displayName:[(value)=>value.length >=1,'el nombre debe ser obligatorio']
}

export const RegisterPage = () => {


  const { displayName,email, onInputChange, password ,formState,isFormValid,emailValid,
  passWordValid,displayNameValid} = useForm(formData,formValidations);

  const onSubmit=(event)=>{
    event.preventDefault();
    console.log(formState)
  }



  return (
    <AuthLayout title='Registro'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Nombre Completo"
              type="text"
              placeholder='Nicolas'
              fullWidth 
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!displayNameValid}
              helperText={displayNameValid}/>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Correo"
              type="email"
              placeholder='correo@gmail.com'
              fullWidth 
              name="email"
              value={email}
              onChange={onInputChange}
              error={!emailValid}
              helperText={emailValid}/>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Contraseña"
              type="password"
              placeholder='Contraseña'
              fullWidth  
              name="password"
              value={password}
              onChange={onInputChange}
              error={!passWordValid}
              helperText={passWordValid}/>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth type="submit">
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>

          </Grid>
        </Grid>
      </form>

    </AuthLayout>


  )
}
