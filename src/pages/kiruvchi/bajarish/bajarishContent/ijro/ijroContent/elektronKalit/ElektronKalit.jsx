import React from "react";

const ElektronKalit = ({ setImzo }) => {
  // const [selectVisible, setSelectVisible] = useState(false);

  // eimzo  
  // useEffect(() => {
  //     let li = document.querySelector('.selectElement')?.querySelector('.key')?.querySelectorAll('li');
  //     if (li) {
  //         li.forEach((l, index) => {
  //             l.addEventListener('click', () => {
  //                 let spans = l.querySelectorAll('span');
  //                 let result = [];
  //                 spans.forEach((k) => {
  //                     let arr;
  //                     arr = {
  //                         name: k.textContent.split(':')[k.textContent.split(':').length - 1].trim(),
  //                     }
  //                     result.push(arr);
  //                 })
  //                 setImzo(result);
  //                 document.querySelector('.selectValue').textContent = l.textContent;
  //                 document.querySelector('.selectValue').setAttribute("value", `${l.getAttribute("value")}`);
  //                 document.querySelector('.selectValue').setAttribute("id", `${l.getAttribute("id")}`);
  //                 document.querySelector('.selectValue').setAttribute("vo", `${l.getAttribute("vo")}`);
  //                 for (let i = 0; i < li.length; i++) {
  //                     if (i !== index) {
  //                         li[i].style.backgroundColor = "";
  //                     } else {
  //                         li[i].style.backgroundColor = "rgba(211, 211, 211, 0.379)";
  //                     }
  //                 }
  //             })
  //         })
  //     }
  // }, [selectVisible]);

  // eimzo
  // useEffect(() => {
  //     let li = document.querySelector('.selectElement')?.querySelector('.key')?.querySelectorAll('li');
  //     if (li) {
  //         li.forEach((l, index) => {
  //             l.addEventListener('click', () => {
  //                 let spans = l.querySelectorAll('span');
  //                 let result = [];
  //                 spans.forEach((k) => {
  //                     let arr;
  //                     arr = {
  //                         name: k.textContent.split(':')[k.textContent.split(':').length - 1].trim(),
  //                     }
  //                     result.push(arr);
  //                 })
  //                 setImzo(result);
  //                 document.querySelector('.selectValue').textContent = l.textContent;
  //                 document.querySelector('.selectValue').setAttribute("value", `${l.getAttribute("value")}`);
  //                 document.querySelector('.selectValue').setAttribute("id", `${l.getAttribute("id")}`);
  //                 document.querySelector('.selectValue').setAttribute("vo", `${l.getAttribute("vo")}`);
  //                 for (let i = 0; i < li.length; i++) {
  //                     if (i !== index) {
  //                         li[i].style.backgroundColor = "";
  //                     } else {
  //                         li[i].style.backgroundColor = "rgba(211, 211, 211, 0.379)";
  //                     }
  //                 }
  //             })
  //         })
  //     }
  // }, [selectVisible]);


  return (
    // {/* elektron kalit */ }
    {/* <div className="row mt-2 d-flex justify-content-end" >
                                            <div className="col-lg-8">
                                                <div className="card mr-2">
                                                    <div className="form-group text-color d-flex align-items-start p-2">
                                                        <i className="fas fa-key fa-2x" style={{ marginTop: "40px" }}></i>
                                                        <div className="w-100" style={{ fontSize: "12px", textTransform: "capitalize" }}>
                                                            <form name="testform" className="testform">
                                                                <div className="testformDiv">
                                                                    <label id="message" style={{ color: "red" }}></label>
                                                                    <span style={{ color: "blue" }}>Elektron kalitni tanlang</span> <br />
                                                                    <div className="selectElement" onClick={() => setSelectVisible(!selectVisible)}>
                                                                        {selectVisible ? (
                                                                            <i className="fas fa-angle-up iconDownUp"></i>
                                                                        ) : (
                                                                            <i className="fas fa-angle-down iconDownUp"></i>
                                                                        )}
                                                                        <span name="spanKey" className="selectValue"></span>
                                                                        <ul name="key" className="key" style={{ display: selectVisible ? "block" : "none" }}></ul >
                                                                    </div>
                                                                    <br />
                                                                    {/* Текст для подписи <br />
                                                                <textarea name="data"></textarea><br />
                                                                <button type="button" className="eimzoClick" onClick={window['sign']}>Подписать</button><br />
                                                                ID ключа <label id="keyId"></label><br />
                                                                Подписанный документ PKCS#7<br />
                                                                <textarea name="pkcs7"></textarea><br /> 
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
    // {/* <div className="card-box my-2">
    //                                         <div className="col-lg-12 w-100 d-flex justify-content-end">
    //                                             {/* <button className="btn btn-danger" onClick={cancelEimzo}>Bekor qilish</button> 
    //                                             <button className="btn btn-primary ml-1" onClick={saveAllData}>Saqlash</button>
    //                                         </div>
    //                                     </div> */}

  )
}

export default React.memo(ElektronKalit);