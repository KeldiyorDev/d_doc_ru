import React from "react";
import { url } from "../../../../../../../config";

const FishkaKurish = ({ data }) => {
  return (
    <div className="borderPdf">
      {data[0]?.document?.files?.map((file, index) => (
        file?.extention?.split('/')[file?.extention?.split('/').length - 1] === "pdf" && (
          <embed
            src={url + "/api/file/view/" + file?.generatedName}
            type="application/pdf"
            width="100%"
            height="1000px"
            key={index}
          />
        )
      ))}
    </div>
  )
}

export default React.memo(FishkaKurish);