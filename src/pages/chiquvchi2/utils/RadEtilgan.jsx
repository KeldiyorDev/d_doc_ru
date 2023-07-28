import React from 'react'
import { ShortUser } from '../../../component/ShortUser'

export default function RadEtilgan({ obj }) {
    return (
        <div className="card mx-2">
            <div className="card-header bg-danger text-white header-elements-inline">
                <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>
                    Rad etilgan</h6>
            </div>
            <div className="card-body px-2">
                {
                    (obj?.feedback?.confFeedbacks?.length > 0 || obj?.feedback?.signatoryFeedbacks?.length > 0) &&
                    <div className="col-lg-12 pl-2 pr-2 mb-3">
                        <table className="table table-bordered table-striped table-hover Tab">
                            <thead>
                                <tr>
                                    <th className="text-center">Ism familiyasi</th>
                                    <th className="text-center">Rad etish sanasi</th>
                                    <th className="text-center">Izoh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    obj?.feedback?.confFeedbacks?.map((feedback) => {
                                        return (
                                            <tr key={feedback?.missiveID} className={'mb-2'}>
                                                <td className="text-center">{ShortUser(feedback?.firstName?.trim(), feedback?.lastName?.trim())}</td>
                                                <td className="text-center">{feedback?.rejectedAt?.substr(0, 10)} <br /> {feedback?.rejectedAt?.substr(11, 5)}</td>
                                                <td className="text-center">{feedback?.content}</td>
                                            </tr>

                                        )
                                    })
                                }
                                {
                                    obj?.feedback?.signatoryFeedbacks?.map((feedback) => {
                                        return (
                                            <tr key={feedback?.missiveID} className={'mb-2'}>
                                                <td className="text-center">{ShortUser(feedback?.firstName?.trim(), feedback?.lastName?.trim())}</td>
                                                <td className="text-center">{feedback?.rejectedAt?.substr(0, 10)} <br /> {feedback?.rejectedAt?.substr(11, 5)}</td>
                                                <td className="text-center">{feedback?.content}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}
