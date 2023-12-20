import { useEffect, useState } from "react";
import { Scene } from "../../../../types/Scene"
import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../config/firebase";
import { PlaceSceneImage } from "./PlaceSceneImage";

interface PlaceScenesProps {
    scenes: Scene[]
}

export const PlaceScenes:React.FC<PlaceScenesProps> = ({scenes}) => {

    return(
        <>
        <h1 className=" text-xl font-bold text-gray-900 ml-5 mt-5"> Scenes ({scenes.length}) </h1>
        {
            scenes.map((scene: Scene)=>{
            return(
                <div className = "flex flex-row p-5">
                    <PlaceSceneImage imgUrl = {scene.screenshot}/>
                    <div className = "flex flex-col ml-3">
                        <h1 className=" text-lg font-bold">{scene.name}</h1>
                        <p className=" text-sm "> {scene.description}</p>
                    </div>
                </div>
                )
            })
        }
        </>
    )
}