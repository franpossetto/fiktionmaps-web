// FictionInfo.tsx
import React from 'react';
import { Fiction, Scene } from './types';

interface FictionInfoProps {
  fiction: Fiction;
  scene: Scene;
  // Otros campos que quieras mostrar...
}

const FictionInfo: React.FC<FictionInfoProps> = ({ fiction, scene }) => {
  return (
    <div className="h-auto w-96">
        <div className='px-1 flex flex-row'>
        <img 
            src={`http://localhost:8081${fiction.imgUrl}`} 
            alt="" 
            className="h-44 w-auto" 
            style={{ backgroundColor: 'black' }}
            onError={(e:any) => {e.target.onerror = null; e.target.src='src/assets/fm_v.png';}}
          />
            <div className='flex-column'>
                <h1 className="px-2 text-slate-900">{fiction.name} - {fiction.type}</h1>
        <h1 className="text-lg px-3 font-semibold mb-1 text-slate-900">{scene.name} </h1>
        <p className="px-3 text-slate-900">{scene.description} </p>
        <br></br>
            </div>
        </div>

    </div>
  );
}

export default FictionInfo;