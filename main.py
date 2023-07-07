from fastapi import FastAPI
import pymongo, json
from bson import json_util
from bson import ObjectId
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

client = pymongo.MongoClient("mongodb+srv://renatobessa:carcrud123@carcrud.smxhds1.mongodb.net/")
db = client["Doguinhos"]

class Dog(BaseModel):
    nome: str
    raca: str
    especie: str
    cor: str
    idade: int
    tutor: str

app = FastAPI()

origins = ["http://127.0.0.1:5500", "https://crud-pets-desafio-tech-site.onrender.com/pets/todos"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pets/")
async def cadastra_pets(dog: Dog):
    dog_dict = dog.dict()
    db.doguinhos.insert_one(dog_dict)
    return {"message": "Pet cadastrado com sucesso"}

@app.get("/pets/todos")
async def lista_pets():
    dog = db.doguinhos.find({})

    if dog:
        dog_json = json_util.dumps(dog)
        dog_dict = json.loads(dog_json)
        return dog_dict
    else:
        return {"message": "Pet não encontrado"}
    
@app.get("/pets/{id_pet}")
async def lista_pet_especifico(id_pet: str):
    dog = db.doguinhos.find_one({"_id": ObjectId(id_pet)})

    if dog:
        dog_json = json_util.dumps(dog)
        dog_dict = json.loads(dog_json)
        return dog_dict
    else:
        return {"message": "Pet não encontrado"}
    

@app.put("/pets/atualiza/{id_pet}")
async def edita_pet(id_pet: str, dog: Dog):
    db.doguinhos.update_one({"_id": ObjectId(id_pet)}, {"$set": dog.dict()})

    return {"message": "Pet ATUALIZADO"}


@app.delete("/pets/deleta/{id_pet}")
async def exclui_pet(id_pet: str):
    resultado = db.doguinhos.delete_one({"_id": ObjectId(id_pet)})

    if resultado.deleted_count == 1:
        return {"message": "Pet foi deletado com sucesso!"}
    else:
        return{"message": "Pet não deletado!"}
