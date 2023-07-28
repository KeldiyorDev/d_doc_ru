export const Alert = (setAlert, color, text) => {
  setAlert({ open: true, color: color, text: text });
  setTimeout(() => {
    setAlert({ open: false, color: "", text: "" });
  }, (text?.length / 8) * 1000);
}

export default function AlertContent({ alert }) {
  return (
    alert.open && (
      <div className={`alert alert-${alert.color} alertNotice alert-styled-left alert-dismissible`}>
        <span className="font-weight-semibold">{alert.text}</span>
      </div>
    )
  )
}