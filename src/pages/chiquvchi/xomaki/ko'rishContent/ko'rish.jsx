import ChiquvchiXomakiKurishContent from "./ko'rishContent";


const ChiquvchiXomakiKurish=({ currentUser, edit }) =>{
    return (
        <>
           <ChiquvchiXomakiKurishContent currentUser={currentUser} />
        </>
    )
}

export default React.memo(ChiquvchiXomakiKurish)