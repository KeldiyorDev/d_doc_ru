import React from 'react'
import { Route } from 'react-router-dom'
import Chiquvchi from '../pages/chiquvchi2/Chiquvchi'
import ChiquvchiShablonlarContent from '../pages/chiquvchi2/chiquvchiShablonlar/ChiquvchiShablonlarContent'
import MavjudShablonlar from '../pages/chiquvchi2/chiquvchiShablonlar/MavjudShablonlar'
import ShablonEdit from '../pages/chiquvchi2/chiquvchiShablonlar/ShablonEdit'
import ChiquvchiTabContent from '../pages/chiquvchi2/chiquvchiTab/chiquvchiTabContent/ChiquvchiTabContent'
import ChiquvchiTabEdit from '../pages/chiquvchi2/chiquvchiTabEdit/ChiquvchiTabEdit'
import TableKurish from '../pages/chiquvchi2/tableKurish/TableKurish'
import CheckboxSelect from '../pages/chiquvchi2/utils/multiSelect/CheckboxSelect'

export default function ChiquvchiRoute({ currentUser, permissionUser, ranks }) {
    return (
        <>
            <Route path="/chiquvchi2/yangi">
                <Chiquvchi currentUser={currentUser} permission={permissionUser} ranks={ranks} />
            </Route>

            <Route path="/chiquvchi2/shablon/yaratish" exact>
                <ChiquvchiShablonlarContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
            </Route>

            <Route path="/chiquvchi2/shablon/mavjud" exact>
                <MavjudShablonlar currentUser={currentUser} permission={permissionUser} ranks={ranks} />
            </Route>

            <Route path="/chiquvchi2/shablon/edit">
                <ShablonEdit currentUser={currentUser} permission={permissionUser} ranks={ranks} />
            </Route>

            <Route path="/chiquvchi2/tab/:name" exact>
                <ChiquvchiTabContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
            </Route>

            <Route path="/chiquvchi2/kurish/:name/:id">
                <TableKurish currentUser={currentUser} permission={permissionUser} ranks={ranks} />
            </Route>

            <Route path="/chiquvchi2/tab/edit/:id">
                <ChiquvchiTabEdit currentUser={currentUser} permission={permissionUser} ranks={ranks} />
            </Route>

            <Route path="/multi">
                <CheckboxSelect />
            </Route>


        </>
    )
}
