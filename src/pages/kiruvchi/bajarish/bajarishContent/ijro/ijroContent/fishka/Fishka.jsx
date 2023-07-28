import React, { useState } from "react";
import { url } from "../../../../../../../config";

const Fishka = ({ data, params }) => {
  const [isMainFishka, setIsMainFishka] = useState(false);

  return (
    <>
      {data.document?.files?.length > 0 && data.document?.files?.map((file, ind) => (
        (ind === 0) && (
          <embed
            src={url + "/api/file/view/" + file?.generatedName}
            type="application/pdf"
            width="100%"
            height="1000px"
            key={ind}
          />
        )
      ))}
      <div className="text-center">
        {(data.document?.isDirect && data.document?.hasMainFishka) ?
          !isMainFishka ?
            <button className="btn btn-success ml-3 mb-3" onClick={() => setIsMainFishka(!isMainFishka)}>{"Посмотреть основное разрешение"} </button> :
            <button className="btn btn-danger ml-3 mb-3" onClick={() => setIsMainFishka(!isMainFishka)}>{"Закрыть основное разрешение"} </button> : ""}
      </div>
      {isMainFishka && (
        <div className="ml-3 mr-3">
          <embed
            src={url + "/api/document/mainFishka/" + params.id}
            type="application/pdf"
            width="100%"
            height="1000px"
          />
        </div>
      )}
    </>
  )
}

export default React.memo(Fishka);