import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {


    const dispatch=useDispatch();

    const { active: note,messageSaved ,isSaving} = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {

        const newDate=new Date(date);

        return newDate.toUTCString();

    }, [date])

        //hay que comenzar a hacer la grabacion desde el thunk para llegar a firebase
    const onSaveNote=()=>{
        dispatch(startSaveNote());
    }


    //cuando cualquier stado del form cambie , se hara el dispatch
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);
    

    useEffect(() => {
        if(messageSaved.length>0){
            Swal.fire('Nota actualizada',messageSaved,'success')
        }

    }, [messageSaved])
    
    const onFileInputChange=({target})=>{
        if(target.files===0)return;

        dispatch(startUploadingFiles(target.files));
        /* console.log(target.files) */
    }
    
    const onDelete=()=>{
        dispatch(startDeletingNote());
    }
    

    const fileInputRef=useRef()

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> {dateString}</Typography>
            </Grid>
            <Grid item>

                <input ref={fileInputRef}type="file" multiple onChange={onFileInputChange}
                style={{display:'none'}}/>

            <IconButton color="primary" disabled={isSaving} onClick={()=>fileInputRef.current.click()}>
                <UploadOutlined/>
            </IconButton>
            </Grid>
            <Grid item>
                <Button 
                disabled={isSaving} 
                onClick={onSaveNote}
                color="primary" 
                sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingresa un titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange} />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que sucedio en el dia de hoy?"
                    name="body"
                    value={body}
                    onChange={onInputChange}
                    minRows={5} />
            </Grid>

            <Grid container justifyContent='end'>
                <Button onClick={onDelete}
                sx={{mt:2}}
                color="error">
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>
            <ImageGallery images={note.imageUrls} />

        </Grid>
    )
}
