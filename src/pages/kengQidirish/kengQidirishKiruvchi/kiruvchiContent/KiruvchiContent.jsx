import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import { axiosInstance } from "../../../../config";

const KiruvchiContent = ({
  user,
  from,
  cardTyperef,
  cardNameRef,
  setFrom,
  to,
  setTo,
  kiruvchiFlex,
  currentUser,
  boshSana,
  statusref,
  executorStatusref,
  setBoshSana,
  chiqRaqamRef,
  regNomerRef,
  oxirgiSana,
  userref,
  submissionFormref,
  korrespondentref,
  izohRef,
  setOxirgiSana
}) => {
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [taqdimForma, setTaqdimForma] = useState([]);
  const [cardsName, setCardsName] = useState([]);
  const [korrespondent, setKorrespondent] = useState([]);
  const [tasdiqlovchi, setTasdiqlovchi] = useState([]);
  const [statusData, setStatusData] = useState([])

  useEffect(() => {
    let cancel = true
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/showCardTypeByOrg/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((c) => {
          arr.push({ value: c.id, label: c.cardName });
        })
        if (cancel)
          setNotParentsCard(arr);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      cancel = false
    }
  }, [currentUser]);

  const notParentsCardClick = async (e) => {
    if (e) {
      try {
        const res = await axiosInstance.get(`organization/showCard/cardType/${e.value}/${JSON.parse(localStorage.getItem('oi'))}`)
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.cardName, title: d.cardName });
        })
        setCardsName(arr);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    let isMounted = true;
    if (user.inputData?.cardTypeName?.length > 0 && isMounted) {

      if (isMounted)
        notParentsCardClick(user.inputData?.cardTypeName[0]);
    }

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.inputData?.cardTypeName]);

  // barcha taqdim etish formasini o'qib olish
  useEffect(() => {
    let cancel = true
    const getData = async () => {
      try {
        const res = await axiosInstance.get("submissionForm/orgAll/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.name })
        });
        if (cancel)
          setTaqdimForma(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      cancel = false
    }
  }, [currentUser]);

  // all data korrespondent
  useEffect(() => {
    let cancel = true
    const getData = async () => {
      // barcha korrespondentlarni o'qib olish
      try {
        const res = await axiosInstance.get("organization/orgCorrespondent/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach(d => {
          arr.push({ value: d.id, label: d.orgName })
        });
        if (cancel)
          setKorrespondent(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      cancel = false
    }
  }, [currentUser]);

  // barcha tasdiqlovchilarni o'qib olish
  useEffect(() => {
    let cancel = true
    const getData = async () => {
      try {
        const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : "";
          arr.push({ value: d?.workPlaceId, label: `${firstname} ${d?.lastName ? d?.lastName : ""}` })
        });
        if (cancel)
          setTasdiqlovchi(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      cancel = false
    }
  }, [currentUser]);

  // statuslarni o'qib olish
  useEffect(() => {
    let cancel = true
    const getDate = async () => {
      const arr = []

      const { data } = await axiosInstance.get('/document/status')

      data.forEach(status => {
        arr.push({
          value: status,
          label: status === 'NOT_VIEWED' ? 'Ko\'rilmagan'
            : status === 'VIEWED' ? "Ko'rilgan"
              : status === "DONE" ? "Bajarilgan"
                : status === "NOT_DONE" ? "Bajarilmagan"
                  : status === "REJECTED" ? "Rad etilgan"
                    : status === "DIRECTED" && "Yo'naltirligan"
        })
      })
      if (cancel) setStatusData(arr)
    }
    getDate().then(r => r)

    return () => {
      cancel = false
    }
  }, [currentUser]);

  return (
    <>
      {/* kiruvchi uchun */}
      < div className="row" id="kiruvchi" style={{ display: user?.inputData.select === "Kiruvchi" ? "flex" : "none" }} ref={kiruvchiFlex}>
        {/* row 1 */}
        < div className="col-lg-3 sm-mb-10">
          <div className={'changeBox'}
            style={{
              width: '100%',
              border: '1px solid lightgray',
              borderRadius: '5px', '&>input': {
                border: 'none !important',
                outline: 'none !important'
              }, '&:hover': {
                border: 'none !important',
                outline: 'none !important'
              }
            }}>
            <DatePicker
              width="100"
              height="100%"
              className={'chiquvchiSana'}
              id={'chiquvchiSana'}
              selected={from}
              onChange={(date) => setFrom(date)}
              placeholderText="dan..."
              dateFormat={'dd.MM.yyyy'}
              name="startDateKengQidirish" // vazifasi date ni ustiga bosganda chiqadigan padskazkani ko'rsatmaslik uchun
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>
        </div>
        <div className="col-lg-3 sm-mb-10">
          <div className={'changeBox'}
            style={{
              width: '100%',
              border: '1px solid lightgray',
              borderRadius: '5px', '&>input': {
                border: 'none !important',
                outline: 'none !important'
              }, '&:hover': {
                border: 'none !important',
                outline: 'none !important'
              }
            }}>
            <DatePicker
              width="100"
              height="100%"
              className={'chiquvchiSana'}
              id={'chiquvchiSana'}
              selected={to}
              onChange={(date) => setTo(date)}
              placeholderText="gacha"
              dateFormat={'dd.MM.yyyy'}
              name="startDate" // vazifasi date ni ustiga bosganda chiqadigan padskazkani ko'rsatmaslik uchun
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group sm-mb-10 form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <Select
                  defaultValue={user?.inputData?.cardTypeName}
                  options={notParentsCard}
                  onChange={notParentsCardClick}
                  placeholder="Xujjat turi"
                  className="cardTypeId"
                  isClearable={true}
                  ref={cardTyperef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group sm-mb-10 form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative relative1">
                <Select
                  defaultValue={user?.inputData?.cardName}
                  options={cardsName}
                  placeholder="Card nomi"
                  className="card1 ssss"
                  isClearable={true}
                  ref={cardNameRef}
                />
              </div>
            </div>
          </div>
        </div>

        {/* row 2 */}
        <div className="col-lg-3">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="text"
                  defaultValue={user?.inputData?.outNumber}
                  className="form-control form-control-outline"
                  placeholder="Placeholder"
                  ref={chiqRaqamRef}
                />
                <label className="label-floating">Chiquvchi raqami</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 sm-mb-10">
          <div className={'changeBox'}
            style={{
              width: '100%',
              border: '1px solid lightgray',
              borderRadius: '5px', '&>input': {
                border: 'none !important',
                outline: 'none !important'
              }, '&:hover': {
                border: 'none !important',
                outline: 'none !important'
              }
            }}>
            <DatePicker
              width="100"
              height="100%"
              className={'chiquvchiSana'}
              id={'chiquvchiSana'}
              selected={boshSana}
              onChange={(date) => setBoshSana(date)}
              placeholderText="Chiquvchi sana"
              dateFormat={'dd.MM.yyyy'}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
              name="startDateChiquvchi" // vazifasi date ni ustiga bosganda chiqadigan padskazkani ko'rsatmaslik uchun
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group row">
            <div className="col-lg-12">
              <Select
                defaultValue={user?.inputData?.status}
                options={statusData}
                placeholder="Holati"
                className='statusDataSelect'
                isClearable
                ref={statusref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group row">
            <div className="col-lg-12">
              <Select
                defaultValue={user?.inputData?.executorStatus}
                options={[
                  {
                    value: "N,U,M bo'yicha qidirish",
                    label: "N,U,M bo'yicha qidirish",
                    isDisabled: true
                  },
                  { value: "NAZORAT UCHUN", label: "NAZORAT UCHUN" },
                  { value: "MA'LUMOT UCHUN", label: "MA'LUMOT UCHUN" },
                  { value: "UMUMLASHTIRUVCHI", label: "UMUMLASHTIRUVCHI" },
                  { value: "BAJARISH UCHUN", label: "BAJARISH UCHUN" },
                ]}
                placeholder="N, U, M bo'yicha qidirish"
                className='NUM'
                isClearable
                ref={executorStatusref}
              />
            </div>
          </div>
        </div>

        {/* row 3 */}
        <div className="col-lg-3">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control  form-control-outline"
                  placeholder="Placeholder"
                  ref={regNomerRef}
                  defaultValue={user?.inputData?.regNumber}
                />
                <label className="label-floating">Reg №</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 sm-mb-10">
          <div className={'changeBox'}
            style={{
              width: '100%',
              border: '1px solid lightgray',
              borderRadius: '5px', '&>input': {
                border: 'none !important',
                outline: 'none !important'
              }, '&:hover': {
                border: 'none !important',
                outline: 'none !important'
              }
            }}>
            <DatePicker
              width="100"
              height="100%"
              className={'chiquvchiSana'}
              id={'chiquvchiSana'}
              selected={oxirgiSana}
              onChange={(date) => setOxirgiSana(date)}
              placeholderText="Muddat"
              dateFormat={'dd.MM.yyyy'}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
              name="startDate" // vazifasi date ni ustiga bosganda chiqadigan padskazkani ko'rsatmaslik uchun
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating sm-mb-10 row">
            <div className="col-lg-12">
              <Select
                defaultValue={user?.inputData?.confirmerName}
                options={tasdiqlovchi}
                placeholder="Tasdiqlovchi"
                className='tasdiqlovchi'
                isClearable={true}
                ref={userref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating row sm-mb-10">
            <div className="col-lg-12">
              <Select
                defaultValue={user?.inputData?.submissionFormName}
                options={taqdimForma}
                placeholder="Taqdim etish formasi"
                className='taqdimForma'
                isClearable={true}
                ref={submissionFormref}
              />
            </div>
          </div>
        </div>

        {/* row 4 */}
        <div className="col-lg-6">
          <div className="form-group form-group-floating sm-mb-10 row">
            <div className="col-lg-12">
              <Select
                defaultValue={user?.inputData?.correspondentName}
                options={korrespondent}
                placeholder="Korrespondent"
                className='korrespondent'
                isClearable={true}
                ref={korrespondentref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <textarea
                  rows="1"
                  className="form-control  form-control-outline"
                  placeholder="Placeholder"
                  defaultValue={user.inputData?.description}
                  ref={izohRef}
                >
                </textarea>
                <label className="label-floating">Izoh</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(KiruvchiContent);