import React from "react";
import AllFilesKiruvchiKurish from "./AllFilesKiruvchiKurish";

const KiruvchiKurish = ({ data }) => {
  return (
    <div className="card-box">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{
              fontWeight: "bold",
              textTransform: "upperCase"
            }}>Входящий</h6>
          </div>
          <div className="card-body">
            <div className="p-0">
              <table
                className="table table-bordered table-striped table-hover Tab">
                <tbody>
                  {data?.length > 0 && data[0].document?.files?.length > 0 && data[0].document.files.map((hujjat, index) => (
                    <AllFilesKiruvchiKurish
                      hujjat={hujjat}
                      key={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(KiruvchiKurish);