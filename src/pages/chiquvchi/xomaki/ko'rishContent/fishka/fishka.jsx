import React, { useState } from "react";
import { urlOut} from "../../../../../config";

export default function FishkaOutgoing({ data, params }) {
    const [isMainFishka, setIsMainFishka] = useState(false);
    console.log(data)
    return (
        <div className="col-lg-5">
            <div className="card-body">
                {data[0]?.baseFiles?.length > 0 && data[0]?.baseFiles?.map((file, ind) => (
                    (ind === 0) && (
                        <embed
                            src={urlOut + "file/" + file?.generatedName}
                            type="application/pdf"
                            width="100%"
                            height="1000px"
                            key={ind}
                        />
                    )
                ))}
            </div>
            <div className="text-center">
                {data?.isDirect ? !isMainFishka ? <button className="btn btn-success ml-3 mb-3" onClick={() => setIsMainFishka(!isMainFishka)}>{"Asosiy rezolutsiyani ko'rish"} </button> : <button className="btn btn-danger ml-3 mb-3" onClick={() => setIsMainFishka(!isMainFishka)}>{"Asosiy rezolutsiyani yopish"} </button> : ""}
            </div>
            {isMainFishka && (
                <div className="ml-3 mr-3">
                    <embed
                        src={urlOut + "/document/mainFishka/" + params.id}
                        type="application/pdf"
                        width="100%"
                        height="1000px"
                    />
                </div>
            )}
        </div>
    )
}