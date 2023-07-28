import React, { useRef, useState } from "react";
import './FuqaroMurojatContent.css';
import NavbarFuqaroMurojat from "../navbarFuqaroMurojat/NavbarFuqaroMurojat";
import AllPersons from "./fuqaroQismi/allPersons/AllPersons";
import TopRightJournals from "./hujjatQismi/TopRightJournals";
import CenterContent from "./hujjatQismi/CenterContent";
import { useSelector } from "react-redux";
import { axiosInstanceFq } from "../../../config";
import { IsFileType } from "../../../component/IsFilType";
import AlertContent, { Alert } from "../../../component/alert/Alert";
import { useHistory } from "react-router-dom";

const FuqaroMurojatiContent = ({ currentUser, permission1, ranks }) => {
    const history = useHistory();
    // const {user} = useSelector(state => state);
    const { insta: user } = useSelector(state => state.user);
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [dataKorrespondent, setDataKorrespondent] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startDateKorres, setStartDateKorres] = useState();
    const [allexecutorsData, setAllexecutorsData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [murojaatSoni, setMurojaatSoni] = useState(1);
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState(null);

    // const refs = useRef(arr.map(() => React.createRef()));
    const personRef = useRef();
    const nameRef = useRef();
    const lastNameRef = useRef();
    const middleNameRef = useRef();
    const phoneRef = useRef();
    const ViloyatRef = useRef();
    const TumanRef = useRef();
    const SectorRef = useRef();
    const MahallaRef = useRef();
    const AddressRef = useRef();
    const JurnalRef = useRef();
    const ReceptionTypeRef = useRef();
    const AppealTypeRef = useRef();
    const AppealFormRef = useRef();
    const PageCountRef = useRef();
    const AppealerCountRef = useRef();
    const ExtraAppealerRef = useRef();
    const ConfirmerRef = useRef();
    const korresRef = useRef();
    const chiquvchiRaqamRef = useRef();
    const orgNameRef = useRef();
    const tasnif1Ref = useRef();
    const tasnif2Ref = useRef();
    const tasnif3Ref = useRef();

    const colourStyles1 = {
        control: (styles) => ({ ...styles, height: '56px' }),
        option: (styles, { isDisabled }) => {
            return {
                ...styles,
                textTransform: 'upperCase',
                fontWeight: isDisabled ? "bold" : " ",
                fontSize: isDisabled ? "16px" : '14px',
                color: isDisabled ? "blue" : "black",
                cursor: isDisabled ? "not-allowed" : "default",
            };
        }
    };

    const goToResolution = () => {
        history.push(`/fuqaro/murojati/xomaki`);
        setOpenModal(false)
    }

    const props = () => {
        personRef.current?.props?.value && personRef.current?.removeValue(personRef.current.props.value);
        ViloyatRef.current?.props?.value && ViloyatRef.current?.removeValue(ViloyatRef.current.props.value);
        TumanRef.current?.props?.value && TumanRef.current?.removeValue(TumanRef.current.props.value);
        MahallaRef.current?.props?.value && MahallaRef.current?.removeValue(MahallaRef.current.props.value);
        JurnalRef.current?.props?.value && JurnalRef.current?.removeValue(JurnalRef.current.props.value);
        ReceptionTypeRef.current?.props?.value && ReceptionTypeRef.current?.removeValue(ReceptionTypeRef.current.props.value);
        AppealTypeRef.current?.props?.value && AppealTypeRef.current?.removeValue(AppealTypeRef.current.props.value);
        AppealFormRef.current?.props?.value && AppealFormRef.current?.removeValue(AppealFormRef.current.props.value);
        ConfirmerRef.current?.props?.value && ConfirmerRef.current?.removeValue(ConfirmerRef.current.props.value);
        korresRef.current?.props?.value && korresRef.current?.removeValue(korresRef.current.props.value);
        // tasnif1Ref.current?.props?.value && tasnif1Ref.current?.removeValue(tasnif1Ref.current.props.value);
        // tasnif2Ref.current?.props?.value && tasnif2Ref.current?.removeValue(tasnif2Ref.current.props.value);
        // tasnif3Ref.current?.props?.value && tasnif3Ref.current?.removeValue(tasnif3Ref.current.props.value);


        console.log({
            // citizenTypeCode: personRef.current?.props?.value,
            // orgName: personRef.current?.props.value,
            // provinceID: ViloyatRef.current?.props.value,
            // districtID: TumanRef.current?.props.value,
            // neighborhoodID: MahallaRef.current?.props.value,
            // address: AddressRef.current?.value,
            // journalID: JurnalRef.current?.props.value,
            // regNumber: JurnalRef.current.props.value?.currentNumber,
            // receptionTypeID: ReceptionTypeRef.current?.props.value,
            // appealTypeID: AppealTypeRef.current?.props.value,
            // appealFormID: AppealFormRef.current?.props.value,
            // pageCount: PageCountRef.current?.value,
            // appealerCount: AppealerCountRef.current?.value,
            // extraAppealer: ExtraAppealerRef.current?.value,
            // confirmerID: ConfirmerRef.current?.props.value,
            // correspondentID: korresRef.current?.props.value,
            // outNumber: chiquvchiRaqamRef.current?.value,
        })
    }

    const goToYangi = () => {
        window.location.reload();

        // personRef.current.props.value = null;
        // nameRef.current.value = null;
        // lastNameRef.current.value = null;
        // middleNameRef.current.value = null;
        // phoneRef.current.value = null;
        // ViloyatRef.current.props.value = null;
        // TumanRef.current.props.value = null;
        // MahallaRef.current.props.value = null;
        // AddressRef.current.value = null;
        // JurnalRef.current.props.value = null;
        // ReceptionTypeRef.current.props.value = null;
        // AppealTypeRef.current.props.value = null;
        // AppealFormRef.current.props.value = null;
        // PageCountRef.current.value = null;
        // AppealerCountRef.current.props.value = null;
        // ExtraAppealerRef.current.props.value = null;
        // ConfirmerRef.current.props.value = null;
        // korresRef.current.props.value = null;
        // chiquvchiRaqamRef.current.value = null;
        // orgNameRef.current.props.value = null;

        // setAlert({open: false, color: "", text: ""});
        // setDataKorrespondent([]);
        // setStartDate(new Date());
        // setAllexecutorsData([]);
        // setOpenModal(false);
        // setMurojaatSoni(1);
        // setFile(null);
        // setFile1(null);
    }


    // barcha ma'lumotlarni saqlash
    const saveAllData = async (e) => {
        e.preventDefault();
        let accepted = true, accepted1 = true, num = null, problems = [], objFormData = {};

        // barcha tasnif1, tasnif2, tasnif3, shortDescription larni o'qib olish
        let addNewBoxForm = document.querySelectorAll('.addNewBoxForm');
        let allDataForm = [], fileId = [];
        addNewBoxForm.forEach((elem) => {
            let formsOutlineElements = {};
            user.tasnif1.forEach((d) => {
                if (d?.label === elem.querySelector('.tasnif1').querySelector('.css-qc6sy-singleValue')?.textContent)
                    formsOutlineElements.tasnif1 = d.value;
            })
            user.tasnif2.forEach((d) => {
                if (d?.label === elem.querySelector('.tasnif2').querySelector('.css-qc6sy-singleValue')?.textContent)
                    formsOutlineElements.tasnif2 = d.value;
            })
            user.tasnif3.forEach((d) => {
                if (d?.label === elem.querySelector('.tasnif3').querySelector('.css-qc6sy-singleValue')?.textContent)
                    formsOutlineElements.tasnif3 = d.value;
            })
            formsOutlineElements.shortDescription = elem.querySelector('.shortDescription')?.value;

            if (formsOutlineElements.tasnif1 && formsOutlineElements.tasnif2 && formsOutlineElements.tasnif3 && formsOutlineElements.shortDescription) {
                formsOutlineElements.yes = true
            } else {
                formsOutlineElements.yes = false
            }
            allDataForm.push(formsOutlineElements);
        });

        allDataForm.forEach((d) => {
            if (!(d.yes)) accepted = false;
        })

        allDataForm.forEach((d, index) => {
            let inExecutors = [], outExecutors = [];
            // ichki bajaruvchilarni olish
            if (allexecutorsData[index]?.ichkiBajaruvchilar?.length > 0) {
                allexecutorsData[index]?.ichkiBajaruvchilar?.forEach((user) => {
                    let obj = {
                        executorCode: user?.executorStatusName,
                        workPlaceID: user?.workPlaceId,
                        responsible: user?.isResponsible,
                        description: user?.description,
                        deadline: user.deadline
                    }
                    inExecutors.push(obj);
                })
            }
            // tashqi bajaruvchilarni olish
            if (allexecutorsData[index]?.tashqiBajaruvchilar?.length > 0) {
                allexecutorsData[index].tashqiBajaruvchilar.forEach((user) => {
                    let obj = {
                        ids: user?.ids,
                        id: user?.id,
                        value: user?.value
                    }
                    outExecutors.push(obj);
                })
            }

            //muommo obyekti
            objFormData = {
                id: null,
                classfication1ID: d.tasnif1,
                classfication2ID: d.tasnif2,
                classfication3ID: d.tasnif3,
                shortDescription: d.shortDescription,
                inExecutors: inExecutors,
                outExecutors: outExecutors
            }
            problems.push(objFormData);
        })

        // ichki yoki tashqi bajaruvchilar bitta formada bo'lishi
        if (allexecutorsData?.length > 0) {
            allexecutorsData?.forEach((d) => {
                if (!(d.ichkiBajaruvchilar.length > 0 || d.tashqiBajaruvchilar.length > 0)) {
                    accepted1 = false;
                }
            })
        } else {
            accepted1 = false;
        }


        // fayllarni birma bir formatini tekshirish
        if (file) {
            for (let i = 0; i < Object?.values(file)?.length; i++) {
                const formData = new FormData();
                let fileType = IsFileType(Object.values(file)[i]);

                // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
                if (fileType) {
                    formData?.append("file", Object?.values(file)[i]);
                    try {
                        let res = await axiosInstanceFq.post(`file/upload/${JSON.parse(localStorage.getItem('oi'))}`, formData)
                        fileId.push(res?.data?.data);
                    } catch (error) {
                        console.log(error.response);
                    }
                }
            }
            // duplicat va takroriy burron lar
            let myBtns = document.querySelectorAll('.myBtnn');
            myBtns.forEach((btn) => {
                if (btn.hasAttribute('style')) {
                    num = btn.textContent === "T" ? 2 : 1;
                }
            });

            // umumiy malumotlarni yuborish
            if (personRef.current.props.value.value === 1) {
                if (nameRef.current.value) {
                    if (lastNameRef.current.value) {
                        if (middleNameRef.current.value) {
                            if (phoneRef.current.value.length === 12) {
                                if (ViloyatRef.current.props.value) {
                                    if (TumanRef.current.props.value) {
                                        if (MahallaRef.current.props.value) {
                                            if (AddressRef.current?.value) {
                                                if (JurnalRef.current.props.value) {
                                                    if (startDate) {
                                                        if (ReceptionTypeRef.current.props.value) {
                                                            if (AppealTypeRef.current.props.value) {
                                                                if (AppealFormRef.current.props.value) {
                                                                    if (PageCountRef.current.value) {
                                                                        if (AppealerCountRef.current.value) {
                                                                            if (murojaatSoni > 1) {
                                                                                if (ExtraAppealerRef.current?.value.length > 0) {
                                                                                    if (accepted) {
                                                                                        if (accepted1) {
                                                                                            if (ConfirmerRef.current.props.value) {
                                                                                                if (fileId.length > 0) {
                                                                                                    try {
                                                                                                        const res = await axiosInstanceFq.post("appeal", {
                                                                                                            citizenTypeCode: personRef.current.props.value?.value,
                                                                                                            firstName: personRef.current.props.value?.value === 1 ? nameRef.current?.value : null,
                                                                                                            lastName: personRef.current.props.value?.value === 1 ? lastNameRef.current?.value : null,
                                                                                                            middleName: personRef.current.props.value?.value === 1 ? middleNameRef.current?.value : null,
                                                                                                            orgName: personRef.current.props.value?.value === 2 ? orgNameRef.current?.value : null,
                                                                                                            phoneNumber: phoneRef.current?.value,
                                                                                                            provinceID: ViloyatRef.current.props.value?.value,
                                                                                                            districtID: TumanRef.current.props.value?.value,
                                                                                                            neighborhoodID: MahallaRef.current.props.value?.value,
                                                                                                            address: AddressRef.current?.value,
                                                                                                            journalID: JurnalRef.current.props.value?.value,
                                                                                                            regNumber: JurnalRef.current.props.value?.currentNumber,
                                                                                                            regDate: startDate,
                                                                                                            receptionTypeID: ReceptionTypeRef.current.props.value?.value,
                                                                                                            appealTypeID: AppealTypeRef.current.props.value?.value,
                                                                                                            appealFormID: AppealFormRef.current.props.value?.value,
                                                                                                            pageCount: PageCountRef.current?.value,
                                                                                                            appealerCount: AppealerCountRef.current?.value,
                                                                                                            extraAppealer: ExtraAppealerRef.current?.value,
                                                                                                            problems: problems,
                                                                                                            filesID: fileId,
                                                                                                            confirmerID: ConfirmerRef.current.props.value?.value,
                                                                                                            correspondentID: korresRef.current.props.value?.value,
                                                                                                            outNumber: chiquvchiRaqamRef.current?.value,
                                                                                                            outDate: startDateKorres,
                                                                                                            orgID: JSON.parse(localStorage.getItem('oi')),
                                                                                                            appealStatus: num,
                                                                                                            senderOrgID: null,
                                                                                                            senderProblemID: null,
                                                                                                        });
                                                                                                        setOpenModal(true);
                                                                                                        console.log(res.data);
                                                                                                    } catch (error) {
                                                                                                        console.log(error);
                                                                                                    }
                                                                                                } else {
                                                                                                    Alert(setAlert, "warning", "Fayl tanlanmagan");
                                                                                                }
                                                                                            } else {
                                                                                                Alert(setAlert, "warning", "Tasdiqlovchi tanlanmagan");
                                                                                            }
                                                                                        } else {
                                                                                            Alert(setAlert, "warning", "Yangi qo'shilgan formalardan Ichki yoki Tashqi bajaruvchilar tanlanmagan bo'lishi mumkin");
                                                                                        }
                                                                                    } else {
                                                                                        Alert(setAlert, "warning", "Qaysidir formadagi Tasnif1, Tasnif2, Tasnif3 yoki Qisqacha mazmuni tanlanmagan bo'lishi mumkin");
                                                                                    }
                                                                                } else {
                                                                                    Alert(setAlert, "warning", "Qoshimcha murojatchi kiritilmagan");
                                                                                }
                                                                            } else {
                                                                                if (accepted) {
                                                                                    if (accepted1) {
                                                                                        if (ConfirmerRef.current.props.value) {
                                                                                            if (fileId.length > 0) {
                                                                                                try {
                                                                                                    const res = await axiosInstanceFq.post("appeal", {
                                                                                                        citizenTypeCode: personRef.current.props.value?.value,
                                                                                                        firstName: personRef.current.props.value?.value === 1 ? nameRef.current?.value : null,
                                                                                                        lastName: personRef.current.props.value?.value === 1 ? lastNameRef.current?.value : null,
                                                                                                        middleName: personRef.current.props.value?.value === 1 ? middleNameRef.current?.value : null,
                                                                                                        orgName: personRef.current.props.value?.value === 2 ? orgNameRef.current?.value : null,
                                                                                                        phoneNumber: phoneRef.current?.value,
                                                                                                        provinceID: ViloyatRef.current.props.value?.value,
                                                                                                        districtID: TumanRef.current.props.value?.value,
                                                                                                        neighborhoodID: MahallaRef.current.props.value?.value,
                                                                                                        address: AddressRef.current?.value,
                                                                                                        journalID: JurnalRef.current.props.value?.value,
                                                                                                        regNumber: JurnalRef.current.props.value?.currentNumber,
                                                                                                        regDate: startDate,
                                                                                                        receptionTypeID: ReceptionTypeRef.current.props.value?.value,
                                                                                                        appealTypeID: AppealTypeRef.current.props.value?.value,
                                                                                                        appealFormID: AppealFormRef.current.props.value?.value,
                                                                                                        pageCount: PageCountRef.current?.value,
                                                                                                        appealerCount: AppealerCountRef.current?.value,
                                                                                                        extraAppealer: ExtraAppealerRef.current?.value,
                                                                                                        problems: problems,
                                                                                                        filesID: fileId,
                                                                                                        confirmerID: ConfirmerRef.current.props.value?.value,
                                                                                                        correspondentID: korresRef.current.props.value?.value,
                                                                                                        outNumber: chiquvchiRaqamRef.current?.value,
                                                                                                        outDate: startDateKorres,
                                                                                                        orgID: JSON.parse(localStorage.getItem('oi')),
                                                                                                        appealStatus: num,
                                                                                                        senderOrgID: null,
                                                                                                        senderProblemID: null,
                                                                                                    });
                                                                                                    setOpenModal(true);
                                                                                                    console.log(res.data);
                                                                                                } catch (error) {
                                                                                                    console.log(error);
                                                                                                }
                                                                                            } else {
                                                                                                Alert(setAlert, "warning", "Fayl tanlanmagan");
                                                                                            }
                                                                                        } else {
                                                                                            Alert(setAlert, "warning", "Tasdiqlovchi tanlanmagan");
                                                                                        }
                                                                                    } else {
                                                                                        Alert(setAlert, "warning", "Yangi qo'shilgan formalardan Ichki yoki Tashqi bajaruvchilar tanlanmagan bo'lishi mumkin");
                                                                                    }
                                                                                } else {
                                                                                    Alert(setAlert, "warning", "Qaysidir formadagi Tasnif1, Tasnif2, Tasnif3 yoki Qisqacha mazmuni tanlanmagan bo'lishi mumkin");
                                                                                }
                                                                            }

                                                                        } else {
                                                                            Alert(setAlert, "warning", "Murojaatchilar soni kiritilmagan");
                                                                        }
                                                                    } else {
                                                                        Alert(setAlert, "warning", "Sahifalar soni kiritilmagan");
                                                                    }
                                                                } else {
                                                                    Alert(setAlert, "warning", "Murojaat shakli tanlanmagan");
                                                                }
                                                            } else {
                                                                Alert(setAlert, "warning", "Murojaat turi tanlanmagan");
                                                            }
                                                        } else {
                                                            Alert(setAlert, "warning", "Qabul qilish turi tanlanmagan");
                                                        }
                                                    } else {
                                                        Alert(setAlert, "warning", "Registratsiya sanasi kiritilmagan");
                                                    }
                                                } else {
                                                    Alert(setAlert, "warning", "Jurnal tanlanmagan");
                                                }
                                            } else {
                                                Alert(setAlert, "warning", "Manzil kiritilmagan");
                                            }
                                        } else {
                                            Alert(setAlert, "warning", "Mahalla tanlanmagan");
                                        }
                                    } else {
                                        Alert(setAlert, "warning", "Tuman tanlanmagan");
                                    }
                                } else {
                                    Alert(setAlert, "warning", "Viloyat tanlanmagan");
                                }
                            } else {
                                Alert(setAlert, "warning", "Telefon nomer kiritish majburiy");
                            }
                        } else {
                            Alert(setAlert, "warning", "Otasining ismi kiritilmagan");
                        }
                    } else {
                        Alert(setAlert, "warning", "Familiya kiritish majburiy");
                    }
                } else {
                    Alert(setAlert, "warning", "Ism kiritish majburiy");
                }
            } else if (personRef.current.props.value.value === 2) {
                if (orgNameRef.current?.value) {
                    if (phoneRef.current.value.length === 12) {
                        if (ViloyatRef.current.props.value) {
                            if (TumanRef.current.props.value) {
                                if (MahallaRef.current.props.value) {
                                    if (AddressRef.current?.value) {
                                        if (JurnalRef.current.props.value) {
                                            if (startDate) {
                                                if (ReceptionTypeRef.current.props.value) {
                                                    if (AppealTypeRef.current.props.value) {
                                                        if (AppealFormRef.current.props.value) {
                                                            if (PageCountRef.current.value) {
                                                                if (AppealerCountRef.current.value) {
                                                                    if (murojaatSoni > 1) {
                                                                        if (ExtraAppealerRef.current?.value.length > 0) {
                                                                            if (accepted) {
                                                                                if (accepted1) {
                                                                                    if (ConfirmerRef.current.props.value) {
                                                                                        if (fileId.length > 0) {
                                                                                            try {
                                                                                                const res = await axiosInstanceFq.post("appeal", {
                                                                                                    citizenTypeCode: personRef.current.props.value?.value,
                                                                                                    firstName: personRef.current.props.value?.value === 1 ? nameRef.current?.value : null,
                                                                                                    lastName: personRef.current.props.value?.value === 1 ? lastNameRef.current?.value : null,
                                                                                                    middleName: personRef.current.props.value?.value === 1 ? middleNameRef.current?.value : null,
                                                                                                    orgName: personRef.current.props.value?.value === 2 ? orgNameRef.current?.value : null,
                                                                                                    phoneNumber: phoneRef.current?.value,
                                                                                                    provinceID: ViloyatRef.current.props.value?.value,
                                                                                                    districtID: TumanRef.current.props.value?.value,
                                                                                                    neighborhoodID: MahallaRef.current.props.value?.value,
                                                                                                    address: AddressRef.current?.value,
                                                                                                    journalID: JurnalRef.current.props.value?.value,
                                                                                                    regNumber: JurnalRef.current.props.value?.currentNumber,
                                                                                                    regDate: startDate,
                                                                                                    receptionTypeID: ReceptionTypeRef.current.props.value?.value,
                                                                                                    appealTypeID: AppealTypeRef.current.props.value?.value,
                                                                                                    appealFormID: AppealFormRef.current.props.value?.value,
                                                                                                    pageCount: PageCountRef.current?.value,
                                                                                                    appealerCount: AppealerCountRef.current?.value,
                                                                                                    extraAppealer: ExtraAppealerRef.current?.value,
                                                                                                    problems: problems,
                                                                                                    filesID: fileId,
                                                                                                    confirmerID: ConfirmerRef.current.props.value?.value,
                                                                                                    correspondentID: korresRef.current.props.value?.value,
                                                                                                    outNumber: chiquvchiRaqamRef.current?.value,
                                                                                                    outDate: startDateKorres,
                                                                                                    orgID: JSON.parse(localStorage.getItem('oi')),
                                                                                                    appealStatus: num,
                                                                                                    senderOrgID: null,
                                                                                                    senderProblemID: null,
                                                                                                });
                                                                                                setOpenModal(true);
                                                                                                console.log(res.data);
                                                                                            } catch (error) {
                                                                                                console.log(error);
                                                                                            }
                                                                                        } else {
                                                                                            Alert(setAlert, "warning", "Fayl tanlanmagan");
                                                                                        }
                                                                                    } else {
                                                                                        Alert(setAlert, "warning", "Tasdiqlovchi tanlanmagan");
                                                                                    }
                                                                                } else {
                                                                                    Alert(setAlert, "warning", "Yangi qo'shilgan formalardan Ichki yoki Tashqi bajaruvchilar tanlanmagan bo'lishi mumkin");
                                                                                }
                                                                            } else {
                                                                                Alert(setAlert, "warning", "Qaysidir formadagi Tasnif1, Tasnif2, Tasnif3 yoki Qisqacha mazmuni tanlanmagan bo'lishi mumkin");
                                                                            }
                                                                        } else {
                                                                            Alert(setAlert, "warning", "Qoshimcha murojatchi kiritilmagan");
                                                                        }
                                                                    } else {
                                                                        if (accepted) {
                                                                            if (accepted1) {
                                                                                if (ConfirmerRef.current.props.value) {
                                                                                    if (fileId.length > 0) {
                                                                                        try {
                                                                                            const res = await axiosInstanceFq.post("appeal", {
                                                                                                citizenTypeCode: personRef.current.props.value?.value,
                                                                                                firstName: personRef.current.props.value?.value === 1 ? nameRef.current?.value : null,
                                                                                                lastName: personRef.current.props.value?.value === 1 ? lastNameRef.current?.value : null,
                                                                                                middleName: personRef.current.props.value?.value === 1 ? middleNameRef.current?.value : null,
                                                                                                orgName: personRef.current.props.value?.value === 2 ? orgNameRef.current?.value : null,
                                                                                                phoneNumber: phoneRef.current?.value,
                                                                                                provinceID: ViloyatRef.current.props.value?.value,
                                                                                                districtID: TumanRef.current.props.value?.value,
                                                                                                neighborhoodID: MahallaRef.current.props.value?.value,
                                                                                                address: AddressRef.current?.value,
                                                                                                journalID: JurnalRef.current.props.value?.value,
                                                                                                regNumber: JurnalRef.current.props.value?.currentNumber,
                                                                                                regDate: startDate,
                                                                                                receptionTypeID: ReceptionTypeRef.current.props.value?.value,
                                                                                                appealTypeID: AppealTypeRef.current.props.value?.value,
                                                                                                appealFormID: AppealFormRef.current.props.value?.value,
                                                                                                pageCount: PageCountRef.current?.value,
                                                                                                appealerCount: AppealerCountRef.current?.value,
                                                                                                extraAppealer: ExtraAppealerRef.current?.value,
                                                                                                problems: problems,
                                                                                                filesID: fileId,
                                                                                                confirmerID: ConfirmerRef.current.props.value?.value,
                                                                                                correspondentID: korresRef.current.props.value?.value,
                                                                                                outNumber: chiquvchiRaqamRef.current?.value,
                                                                                                outDate: startDateKorres,
                                                                                                orgID: JSON.parse(localStorage.getItem('oi')),
                                                                                                appealStatus: num,
                                                                                                senderOrgID: null,
                                                                                                senderProblemID: null,
                                                                                            });
                                                                                            setOpenModal(true);
                                                                                            console.log(res.data);
                                                                                        } catch (error) {
                                                                                            console.log(error);
                                                                                        }
                                                                                    } else {
                                                                                        Alert(setAlert, "warning", "Fayl tanlanmagan");
                                                                                    }
                                                                                } else {
                                                                                    Alert(setAlert, "warning", "Tasdiqlovchi tanlanmagan");
                                                                                }
                                                                            } else {
                                                                                Alert(setAlert, "warning", "Yangi qo'shilgan formalardan Ichki yoki Tashqi bajaruvchilar tanlanmagan bo'lishi mumkin");
                                                                            }
                                                                        } else {
                                                                            Alert(setAlert, "warning", "Qaysidir formadagi Tasnif1, Tasnif2, Tasnif3 yoki Qisqacha mazmuni tanlanmagan bo'lishi mumkin");
                                                                        }
                                                                    }

                                                                } else {
                                                                    Alert(setAlert, "warning", "Murojaatchilar soni kiritilmagan");
                                                                }
                                                            } else {
                                                                Alert(setAlert, "warning", "Sahifalar soni kiritilmagan");
                                                            }
                                                        } else {
                                                            Alert(setAlert, "warning", "Murojaat shakli tanlanmagan");
                                                        }
                                                    } else {
                                                        Alert(setAlert, "warning", "Murojaat turi tanlanmagan");
                                                    }
                                                } else {
                                                    Alert(setAlert, "warning", "Qabul qilish turi tanlanmagan");
                                                }
                                            } else {
                                                Alert(setAlert, "warning", "Registratsiya sanasi kiritilmagan");
                                            }
                                        } else {
                                            Alert(setAlert, "warning", "Jurnal tanlanmagan");
                                        }
                                    } else {
                                        Alert(setAlert, "warning", "Manzil kiritilmagan");
                                    }
                                } else {
                                    Alert(setAlert, "warning", "Mahalla tanlanmagan");
                                }
                            } else {
                                Alert(setAlert, "warning", "Tuman tanlanmagan");
                            }
                        } else {
                            Alert(setAlert, "warning", "Viloyat tanlanmagan");
                        }
                    } else {
                        Alert(setAlert, "warning", "Telefon nomer kiritish majburiy");
                    }
                } else {
                    Alert(setAlert, "warning", "Organizatsiya kiritish majburiy");
                }
            } else {
                Alert(setAlert, "warning", "Yuridik yoki jismoniy shaxsni tanlash majburiy");
            }
        } else {
            Alert(setAlert, "warning", "Fayl tanlanmagan");
        }
    }

    return (
        <div className="content mb-5 content-mobile">
            <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Yangi Qo'shish</h3>
            <div className="card-body card-body-mobile pt-2">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                    <NavbarFuqaroMurojat currentUser={currentUser} permission={permission1} ranks={ranks} />
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="row" style={{ backgroundColor: '#F1F1F1' }}>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        {/* 2 kala shaxs uchun */}
                                        <AllPersons
                                            orgNameRef={orgNameRef}
                                            currentUser={currentUser}
                                            colourStyles1={colourStyles1}
                                            personRef={personRef}
                                            nameRef={nameRef}
                                            lastNameRef={lastNameRef}
                                            middleNameRef={middleNameRef}
                                            phoneRef={phoneRef}
                                            ViloyatRef={ViloyatRef}
                                            TumanRef={TumanRef}
                                            SectorRef={SectorRef}
                                            MahallaRef={MahallaRef}
                                            AddressRef={AddressRef}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <TopRightJournals
                                    setMurojaatSoni={setMurojaatSoni}
                                    murojaatSoni={murojaatSoni}
                                    currentUser={currentUser}
                                    colourStyles1={colourStyles1}
                                    setDataKorrespondent={setDataKorrespondent}
                                    setAlert={setAlert}
                                    alert={alert}
                                    dataKorrespondent={dataKorrespondent}
                                    JurnalRef={JurnalRef}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    ReceptionTypeRef={ReceptionTypeRef}
                                    AppealTypeRef={AppealTypeRef}
                                    AppealFormRef={AppealFormRef}
                                    PageCountRef={PageCountRef}
                                    AppealerCountRef={AppealerCountRef}
                                    ExtraAppealerRef={ExtraAppealerRef}
                                    setStartDateKorres={setStartDateKorres}
                                    startDateKorres={startDateKorres}
                                    korresRef={korresRef}
                                    chiquvchiRaqamRef={chiquvchiRaqamRef}
                                />
                            </div>
                            <div className="col-lg-12">
                                <CenterContent
                                    tasnif1Ref={tasnif1Ref}
                                    tasnif2Ref={tasnif2Ref}
                                    tasnif3Ref={tasnif3Ref}
                                    props={props}
                                    currentUser={currentUser}
                                    colourStyles={colourStyles1}
                                    saveAllData={saveAllData}
                                    ConfirmerRef={ConfirmerRef}
                                    setFile={setFile}
                                    file={file}
                                    setFile1={setFile1}
                                    file1={file1}
                                    setAllexecutorsData={setAllexecutorsData}
                                    allexecutorsData={allexecutorsData}
                                />
                            </div>
                        </div>
                    </div>


                </div>
                {openModal && (
                    <div className={'adminWindow'}>
                        <div className="modal-dialog modal-sm pt-5 ">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title "></h5>
                                    <button className="close" onClick={() => setOpenModal(false)}
                                        data-dismiss="modal">&times;</button>
                                </div>

                                <div className="modal-body shadowKiruvchi text-center" style={{
                                    padding: "10px",
                                    border: "1px solid lightgray",
                                    margin: "10px",
                                    backgroundColor: "lightgray"
                                }}>
                                    <h3 className="font-weight-semibold py-1 px-1 "
                                        style={{ borderRadius: '5px', fontSize: "20px", color: "#000" }}>Yangi kiruvchi
                                        hujjat
                                        kiritildi</h3>
                                </div>

                                <div className="modal-footer d-flex justify-content-center">
                                    <button type={'button'} onClick={() => goToYangi()} className="btn btn-success"
                                        style={{ width: "150px" }}>Yangi
                                    </button>
                                    <button type={'button'} onClick={() => goToResolution()} className="btn btn-success"
                                        style={{ width: "150px" }}>Xomaki
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* alert */}
                <AlertContent alert={alert} />
            </div>
        </div>
    )
}

export default React.memo(FuqaroMurojatiContent)
