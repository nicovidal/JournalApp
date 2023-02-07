import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"


export const LoginPage = () => {

  const { status,errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch();
  const { email, onInputChange, password } = useForm({
    email: '',
    password: ''
  });

  //se memoriza 
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  //no es la accion
  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password })
    dispatch(startLoginWithEmailPassword({email,password}))

  };

  const onGoogleSignIn = () => {

    dispatch(startGoogleSignIn());

  }
    ;

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Correo"
              type="email"
              placeholder='correo@gmail.com'
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email} />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Contraseña"
              type="password"
              placeholder='Contraseña'
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password} />
          </Grid>
          <Grid 
              container 
              display={ !!errorMessage ? '': 'none' }
              sx={{ mt: 1 }}>
              <Grid 
                  item 
                  xs={ 12 }
                >
                <Alert severity='error' >{JSON.stringify( errorMessage?.errorMessage) }</Alert>
              </Grid>
            </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button  disabled={isAuthenticating}  type="submit" variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button  disabled={isAuthenticating} onClick={onGoogleSignIn} variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>

          </Grid>
        </Grid>
      </form>

    </AuthLayout>

  )
}
