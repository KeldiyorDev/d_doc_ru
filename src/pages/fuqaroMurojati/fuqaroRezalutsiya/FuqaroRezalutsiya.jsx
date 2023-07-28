import React, { useEffect } from "react";
import './fuqaroRezalutsiya.css';
import FuqaroRezalutsiyaContent from "./fuqaroRezalutsiyaContent/FuqaroRezalutsiyaContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

export default function FuqaroRezalutsiya({ currentUser, permission, ranks,}) {

  useEffect(() => {
    VisibleField();
  }, []);

  return <FuqaroRezalutsiyaContent currentUser={currentUser} permission={permission} ranks={ranks} />
}