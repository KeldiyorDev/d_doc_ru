export const beginyillarOption = [
  { value: null, label: 'Yilni tanlash' },
]

for(let i=new Date().getFullYear(); i>=1991; i--) {
  beginyillarOption.push({ value: i, label: i })
}

export const endyillarOption = [
  { value: null, label: 'Yilni tanlash' },
  { value: -1, label: 'Hozirgi vaqtgacha' },
]

for(let i=new Date().getFullYear(); i>=1991; i--) {
  endyillarOption.push({ value: i, label: i })
}
