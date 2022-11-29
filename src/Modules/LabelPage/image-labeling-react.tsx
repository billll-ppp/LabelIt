import React from 'react';
import {Annotator} from 'image-labeler-react';

const Labeler: React.FC = () => {
  return (
    <div className="Labeler">
      <Annotator 
        height={600} 
        width={600} 
        imageUrl={""} 
        asyncUpload={async (labeledData)=>{
            // upload labeled data
        }} 
        types={['A', 'B', 'Cylinder']}
        defaultType={"Cylinder"} />
    </div>
  );
}

export default Labeler;