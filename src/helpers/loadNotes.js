import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseDB } from "../firebase/config";

export const loadNotes=async (uid='')=>{
    if(!uid)throw new Error('El usuario no existe');

    const collectionRef=collection(firebaseDB,`${uid}/journal/notas`);
    const docs=await getDocs(collectionRef);
    //son referencias a los documentos de fire base los docs , debo llamar la data
    /* console.log(docs) */
    const notes=[];
    docs.forEach(doc=>{
        /* console.log(doc.data()); */
        notes.push({id:doc.id,...doc.data()})
    });
    console.log(notes)
    return notes;
}