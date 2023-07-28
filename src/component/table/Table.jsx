import { useState } from 'react';
import Content from "../assets/Content";
import Tab from "../assets/Tab";
import NavItem from "../assets/NavItem";
import Button from "../assets/Button";
import Icon from "../assets/Icon";
import Flex from "../assets/Flex";

const Table = () => {
  const xodim = [
    { label: 'Keldiyor', value: 'Keldiyor' },
    { label: 'QVC', value: 'QVC' }
  ]

  const tableData = [
    {
      id: 14,
      FISH: 'SHOMUROT MIRZAYEV RADJABOVICH',
      lavozim: 'yuridik hizmat boshlig\'i',
      status: 'Tashqarida',
      from: '18:15',
      haveBeen: '03:52:21',
      izoh: 'tel: +998990373914',
      isSomethingWrong: false
    },
    {
      id: 14,
      FISH: 'SHOMUROT MIRZAYEV RADJABOVICH',
      lavozim: 'yuridik hizmat boshlig\'i',
      status: 'Tashqarida',
      from: '18:15',
      haveBeen: '03:52:21',
      izoh: 'tel: +998990373914',
      isSomethingWrong: true
    },
    {
      id: 23,
      FISH: 'SHOMUROT MIRZAYEV RADJABOVICH',
      lavozim: 'yuridik hizmat boshlig\'i',
      status: 'Tashqarida',
      from: '18:15',
      haveBeen: '03:52:21',
      izoh: 'tel: +998990373914',
      isSomethingWrong: false
    },
    {
      id: 36,
      FISH: 'SHOMUROT MIRZAYEV RADJABOVICH',
      lavozim: 'yuridik hizmat boshlig\'i',
      status: 'Tashqarida',
      from: '18:15',
      haveBeen: '03:52:21',
      izoh: 'tel: +998990373914',
      isSomethingWrong: false
    },
  ]

  return (
    <Content title={"Mexnat Intizomi"}>
      <Tab bar={<Nav xodim={xodim} />}>
        <table className="table table-bordered table-striped Tab w-100 desktop-table">
          <thead className={'table-dark'}>
            <tr className="NavLink text-center">
              <th id='tabRow' style={{ width: '3.1%' }} className="id">№</th>
              <th style={{ width: '24.3%' }} className="qabul">Ф.И.Ш</th>
              <th style={{ width: '24.3%' }} className="murojaat">Позиция</th>
              <th style={{ width: '8%' }} className="ariza">Положение</th>
              <th style={{ width: '8%' }} className="mur">С каких пор</th>
              <th style={{ width: '8%', fontSize: 10 }} className="qisqacha">Сколько</th>
              <th style={{ width: '24.3%' }} className="reg">Комментарий</th>
            </tr>
          </thead>
          <tbody className={'table-hover'}>
            {tableData?.map((data, key) => (
              <tr id="kor" key={key} style={{ backgroundColor: data.isSomethingWrong && 'rgba(255,255,0,0.24)' }}>
                <td
                  className="text-center id"
                >{data.id}</td>
                <td
                  className="text-color qabul"
                >{data.FISH}</td>
                <td
                  id="qs"
                  data-maxlength="5"
                  className="mur"
                >{data.lavozim}</td>
                <td className="qisqacha">{data.status}</td>
                <td className="text-center reg">{data.from}</td>
                <td className="harakat">{data.haveBeen}</td>
                <td className="harakat">{data.izoh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tab>
    </Content>
  );
};

export default Table;

function Nav({ xodim }) {

  return (
    <>
      <IconBar />
      <Options />
      <table
        className={'table-sm-full mt-2'}
        style={{
          width: '100%',
          marginLeft: "20px",
          marginRight: "20px"
        }}>
        <thead>
          <tr className={'direction-mobile drm-th-1'}>
            <th style={{ width: '10.5%' }}>
              <input
                placeholder={'F.I.SH'}
                className={'dt-input mr-2 table-sm-full mb-sm-2'}
                style={{ height: 0, padding: 9.4, paddingLeft: 5 }}
              />
            </th>
            <th style={{ width: '21%' }}>
              <select style={{
                borderRadius: 4,
                width: 350,
                outline: 'none',
                border: 'none'
              }} className={'mr-2 table-sm-full mb-sm-2'}>
                <option selected disabled value={1}>Сотрудник</option>
                <option value={2}>QVC</option>
                <option value={3}>KELDIYOR</option>
              </select>
            </th>
            <th>
              <select style={{
                borderRadius: 4,
                width: 200,
                outline: 'none',
                border: 'none'
              }} className={'table-sm-full mb-sm-2'}>
                <option selected disabled value={1}>Сотрудник</option>
                <option value={2}>QVC</option>
                <option value={3}>KELDIYOR</option>
              </select>
            </th>
          </tr>
        </thead>
      </table>
      <NavItem to={'/kiruvchi/tab'} exact={true} ml={true}>
        <Icon className="icon-plus2" mr={1} /> Добавить новое
      </NavItem>

      <NavItem to={'/kiruvchi/tablar'} exact={true} className={'ml-1'}>
        <Icon className="icon-newspaper" mr={1} /> Новый
      </NavItem>

      <NavItem to={'/somewhere'} className={'ml-1'}>
        <Icon className="icon-newspaper" mr={1} /> Временный
      </NavItem>
    </>
  )
}

function Options() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ marginLeft: 15, display: 'flex' }}>
      <Button
        variant={active === 0 ? 'success' : 'secondary'}
        onClick={() => setActive(0)}
        styles={{ padding: '0 4px' }}
      >
        Xodimcha
      </Button>
      <Button
        variant={active === 1 ? 'success' : 'secondary'}
        ml={2}
        onClick={() => setActive(1)}
        styles={{ padding: '0 4px' }}
      >
        Vazirlar
      </Button>
      <Button
        variant={active === 2 ? 'success' : 'secondary'}
        ml={2}
        onClick={() => setActive(2)}
        styles={{ padding: '0 4px' }}
      >
        Topshiriqlar
      </Button>
    </div>
  )
}

function IconBar() {
  return <Flex
    align={'center'}
    styles={{ width: '100%', marginBottom: 10, padding: 10, paddingLeft: 23, background: 'white' }}
  >
    <Icon className={'far fa-file-pdf right-border'} mr={2} color={'crimson'} size={2} font={20} />
    <Icon className={'far fa-file-word right-border wordIcon'} mr={2} size={2} font={20} />
    <Icon className={'far fa-file-excel right-border excelIcon'} mr={2} size={2} font={20} />
    <Icon className={'far fa-file-powerpoint right-border pptIcon'} mr={2} size={2} font={20} />
    <Icon className={'far fa-file-archive right-border rarIcon'} mr={2} size={2} font={20} />
    <Icon className={'fa fa-save wordIcon'} mr={2} size={2} font={20} />
    <Icon className={'fa fa-edit wordIcon right-border'} mr={2} size={2} font={20} />

    <Flex align={'center'}>
      <Icon className={'fa fa-arrow-right wordIcon'} mr={2} size={2} font={20} />
      Пользователь: Lazizbek Tojiboyev
    </Flex>
  </Flex>
}