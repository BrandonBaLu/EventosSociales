from fastapi import Depends, FastAPI , HTTPException, status
from pydantic import BaseModel
import pyrebase
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()


class Respuesta (BaseModel) :  
    message: str  


class Evento (BaseModel) :  
    Nombre: str
    Fecha: str
    Hora: str
    Lugar: str
    Costo: str
    Descripcion: str
    Imagen: str

class EventoUpdate (BaseModel) :  
    id_evento: str
    Nombre: str
    Fecha: str
    Hora: str
    Lugar: str
    Costo: str
    Descripcion: str
    Imagen: str

    

origins = [
    "http://0.0.0.0:8000/",
    "http://127.0.0.1:8000/",
    "*",   
            
    ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hola"}

firebaseConfig = {
  "apiKey": "AIzaSyCuJuJULBMQWVhUWXYEOHsg3FMAEeDRVM0",
  "authDomain": "mipaginaweb-d1d99.firebaseapp.com",
  "databaseURL": "https://mipaginaweb-d1d99-default-rtdb.firebaseio.com",
  "projectId": "mipaginaweb-d1d99",
  "storageBucket": "mipaginaweb-d1d99.appspot.com",
  "messagingSenderId": "953627572865",
  "appId": "1:953627572865:web:c303735d5d069efcfeeb80",
   "measurementId": "G-9L3DBHCJR0"
};

firebase = pyrebase.initialize_app(firebaseConfig)


    
#Obtiene una lista de eventos registrados
@app.get(
    "/eventos/",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Regresa una lista de eventos",
    description="Regresa una lista de eventos"
)
async def get_eventos():
    try:
        db=firebase.database()
        eventos = db.child("Eventos").get().val()
        response = {
            "eventos": eventos
        }
        return response
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No tienes permiso para ver estos datos",
            headers={"WWW-Authenticate": "Basic"},        
        )

#Obtiene un evento por su id
@app.get(
    "/eventos/{id_evento}",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Regresa un evento",
    description="Regresa un evento"
)
async def get_eventos(id_evento: str):
    try:
        db=firebase.database()
        evento = db.child("Eventos").child(id_evento).get().val()
        response = {
            "evento": evento
        }
        return response
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No tienes permiso para ver estos datos",
            headers={"WWW-Authenticate": "Basic"},        
        )
    
#Agrega un evento 
@app.post("/eventos/",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Inserta un evento",
    description="Inserta un evento",
    tags=["auth"]
)
async def post_eventos(evento: Evento):
    try:
        db=firebase.database()
        db.child("Eventos").push({"Nombre": evento.Nombre, "Fecha": evento.Fecha, "Lugar": evento.Lugar, "Costo": evento.Costo, "Descripcion": evento.Descripcion, "Hora": evento.Hora, "Imagen": evento.Imagen})
        response = {"code": status.HTTP_201_CREATED, "message": "Evento creado"}
        return response
    except Exception as error:
        print(f"Error: {error}")
        return(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    
#Actualiza un evento
@app.put(
    "/eventos/",
    response_model=Respuesta,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Actualiza un evento",
    description="Actualiza un evento",
    tags=["auth"]
)
async def put_eventos(evento: EventoUpdate):
    try:
        db=firebase.database()
        id=evento.id_evento
        print(id)
        db.child("Eventos").child(id).update({"Nombre": evento.Nombre, "Fecha": evento.Fecha, "Lugar": evento.Lugar, "Costo": evento.Costo, "Descripcion": evento.Descripcion, "Hora": evento.Hora, "Imagen": evento.Imagen})
        response = {"message":"Evento actualizado"}
        return response
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED           
        )
    
#Elimina un evento
@app.delete(
    "/eventos/{id_evento}",
    response_model=Respuesta,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Elimina un evento",
    description="Elimina un evento",
    tags=["auth"]
)
async def delete_eventos(id_evento: str):
    try:
        db=firebase.database()
        id=id_evento
        print(id)
        db.child("Eventos").child(id).remove()
        response = {"message":"Evento eliminado"}
        return response
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED           
        )

