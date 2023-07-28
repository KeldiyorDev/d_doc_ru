import React from "react";
import { Image, Page, Text, Document, StyleSheet, View, Font } from '@react-pdf/renderer';
// import Roboto from '../ font/Roboto-Thin.ttf';
import Font1 from './font/1.ttf';
import Font2 from './font/2.ttf';
import avatar from '../../../../images/img_avatar.png';
import { urlKadr } from "../../../../config";

// Register font
Font.register({ family: 'Times New Roman', src: Font1 });
Font.register({ family: 'Times New Roman Bold', src: Font2 });

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 40px",
    position: "relative"
  },
  title: {
    textAlign: "center",
    fontFamily: "Times New Roman Bold"
  },
  username: {
    textAlign: "center",
    fontSize: "14px",
    margin: "20px 0",
    fontFamily: "Times New Roman Bold"
  },
  data: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-between"
  },
  date: {
    // flex: 3
  },
  workDate: {
    fontSize: "14px",
    fontWeight: "200",
  },
  workPosition: {
    fontSize: "14px",
    fontWeight: "bold",
    width: "400px",
    marginTop: "2px",
    marginBottom: "10px"
  },
  workPosition1: {
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "2px",
    marginBottom: "5px",
    fontFamily: 'Times New Roman'
  },
  flexBox: {
    position: "relative",
    marginBottom: "12px",
  },
  flexBox3: {
    position: "relative",
    marginBottom: "40px"
  },
  col1: {
    // flex: 12
  },
  col2: {
    position: "absolute",
    top: "0",
    left: "200px"
  },
  userDateTitle: {
    fontSize: "14px",
    fontFamily: 'Times New Roman Bold'
  },
  userDateTitleValue: {
    width: "340px",
    fontSize: "14px",
    fontFamily: 'Times New Roman',
  },
  image: {
    width: "105px",
    height: "140px",
    position: "absolute",
    top: "72px",
    right: "30px"
  },
  pageCount: {
    position: "absolute",
    right: "0",
    left: "0",
    bottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "14px"
  },

  // for table
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "10px",
    borderBottom: "1px solid #000"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid #000",
    borderBottom: "none",
    fontFamily: 'Times New Roman'
    // borderTop: "none",
  },
  th: {
    width: "5%",
    height: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px 5px",
    borderRight: "1px solid #000",
    fontFamily: 'Times New Roman',

    textAlign: "center"
  },
  th1: {
    width: "15%",
    height: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px 5px",
    borderRight: "1px solid #000",
    fontFamily: 'Times New Roman',

    textAlign: "center"
  },
  th2: {
    width: "25%",
    height: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px 5px",
    borderRight: "1px solid #000",
    fontFamily: 'Times New Roman',

    textAlign: "center"
  },
  th3: {
    width: "15%",
    height: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px 5px",
    borderRight: "1px solid #000",
    fontFamily: 'Times New Roman',

    textAlign: "center"
  },
  th4: {
    width: "30%",
    height: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px 5px",
    borderRight: "1px solid #000",
    fontFamily: 'Times New Roman',

    textAlign: "center"
  },
  th5: {
    width: "15%",
    height: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px 5px",
    fontFamily: 'Times New Roman',
    textAlign: "center"
  },
});

const CvPdf = ({ userData, cvData, empBook, relativeData, lan }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>MA'LUMOTNOMA</Text>
        <Text style={styles.username}>{userData.lastName} {userData.firstName} {userData.middleName}</Text>
        <View style={styles.data}>
          <View style={styles.flexBox}>
            <View style={styles.date}>
              <Text style={styles.userDateTitle}>{empBook.length > 0 && empBook[empBook.length - 1]?.startDate} dan:</Text>
              <Text style={styles.userDateTitleValue}>{empBook.length > 0 && empBook[empBook.length - 1]?.companyName}</Text>
            </View>
          </View>
          {/* row1 */}
          <View style={styles.flexBox}>
            <View style={styles.col1}>
              <Text style={styles.userDateTitle}>Tug'ilgan yili: </Text>
              {console.log(userData?.birthDate)}
              <Text style={styles.userDateTitleValue} >{userData?.birthDate?.split("-")?.join(".")}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.userDateTitle} >Tug'ilgan joyi: </Text>
              <Text style={styles.userDateTitleValue}>{userData?.birthPlace}</Text>
            </View>
          </View>
          {/* row2 */}
          <View style={styles.flexBox}>
            <View style={styles.col1}>
              <Text style={styles.userDateTitle}>Millati: </Text>
              <Text style={styles.userDateTitleValue} >{userData?.nationality?.split("/")[0]}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.userDateTitle} >Partiyaviyligi: </Text>
              <Text style={styles.userDateTitleValue}>{cvData?.party || "yo'q"}</Text>
            </View>
          </View>
          {/* row3 */}
          <View style={styles.flexBox3}>
            <View style={styles.col1}>
              <Text style={styles.userDateTitle}>Ma'lumoti: </Text>
              <Text style={styles.userDateTitleValue} >{cvData?.higherEducation || "yo'q"}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.userDateTitle} >Tamomlagan: </Text>
              <Text style={styles.userDateTitleValue}>{cvData?.graduated || "yo'q"}</Text>
            </View>
          </View>

          {/* row5 */}
          <View style={styles.flexBox}>
            <Text>
              <Text style={styles.userDateTitle}>Ma'lumoti bo'yicha mutaxassisligi: </Text>
              <Text style={styles.userDateTitleValue} >{cvData?.profession || "yo'q"}</Text>
            </Text>
          </View>
          {/* row6 */}
          <View style={styles.flexBox}>
            <View style={styles.col1}>
              <Text style={styles.userDateTitle}>Ilmiy darajasi: </Text>
              <Text style={styles.userDateTitleValue} >{cvData?.academicDegree || "yo'q"}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.userDateTitle} >Ilmiy unvoni: </Text>
              <Text style={styles.userDateTitleValue}>{cvData?.academicTitle || "yo'q"}</Text>
            </View>
          </View>
          {/* row7 */}
          <View style={styles.flexBox}>
            <View style={styles.col1}>
              <Text style={styles.userDateTitle}>Qaysi chet tilarini biladi: </Text>
              <Text style={styles.userDateTitleValue} >{lan || "yo'q"}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.userDateTitle} >Harbiy(maxsus) unvoni: </Text>
              <Text style={styles.userDateTitleValue}>{cvData?.militaryRank || "yo'q"}</Text>
            </View>
          </View>
          {/* row8 */}
          <View style={styles.flexBox}>
            <View style={styles.col1}>
              <Text style={styles.userDateTitle}>Davlat mukofotlari bilan taqdirlanganmi (qanaqa): </Text>
              <Text style={styles.userDateTitleValue} >{cvData?.stateAward || "yo'q"}</Text>
            </View>
          </View>
          {/* row9 */}
          <View style={styles.flexBox}>
            <View style={styles.col1}>
              <Text style={styles.userDateTitle}>Xalq deputatlari respublika, viloyat, shahar va tuman Kengashi deputatimi yoki boshqa saylanadigan organlarning a'zosimi (to'liq ko'rsatilishi lozim): </Text>
              <Text style={styles.userDateTitleValue} >{cvData?.deputy || "yo'q"}</Text>
            </View>
          </View>
        </View>

        {/* mehnat faoliyati */}
        {empBook.length > 0 && (
          <>
            <Text style={styles.title}>MEHNAT FAOLIYATI</Text>

            {empBook?.map((item) => {
              return (
                <li>
                  <Text style={styles.workPosition1}><Text style={styles.userDateTitle}> {item.startDate}-{item.endDate === -1 ? " h.v" : item.endDate + " yy."}  </Text> - {item.companyName}</Text>
                </li>
              )
            })}
          </>
        )}

        {/* <Image style={styles.image} src={{ uri: Object.values(userData)?.length > 0 ? `http://192.168.30.151:8080/kadrlar/api/file/download/${userData.avatarId}` : avatar, method: "GET", headers: { "Cache-Control": "no-cache" } }} /> */}
        <Image style={styles.image} src={userData?.avatarPath ? `${urlKadr}file/view/${userData?.id}` : "/assets/user.png"} />

        {/* foydalanuvchi haqida ma'lumot */}
        {relativeData?.length > 0 && (
          <>
            <Text style={styles.title} break>{userData.lastName} {userData.firstName} {userData.middleName} ning yaqin qarindoshlari haqida MA'LUMOT</Text>

            <View style={styles.tableContainer}>
              <View style={styles.row} key={Math.random()}>
                <Text style={styles.th}>№</Text>
                <Text style={styles.th1}>Qarindoshligi</Text>
                <Text style={styles.th2}>Familiyasi, ismi va otasining ismi</Text>
                <Text style={styles.th3}>Tug'ilgan yili va joyi</Text>
                <Text style={styles.th4}>Ish joyi va lavozimi</Text>
                <Text style={styles.th5}>Turar joyi</Text>
              </View>

              {
                relativeData?.map((item, index) => {
                  return (
                    <View style={styles.row} key={index}>
                      <Text style={styles.th}>{index + 1}</Text>
                      <Text style={styles.th1}>{item.kinship}</Text>
                      <Text style={styles.th2}>{item.lastName} {item.firstName} {item.middleName}</Text>
                      <Text style={styles.th3}>{item.birthDate} <br /> {item.birthPlace}</Text>
                      <Text style={styles.th4}>{item.workplace}</Text>
                      <Text style={styles.th5}>{item.locus}</Text>
                    </View>


                  )
                })
              }

            </View>
          </>
        )}

        {/* <Text style={styles.pageCount} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} /> */}
      </Page>
    </Document >
  )
}

export default CvPdf;