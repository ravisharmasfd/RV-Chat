import SearchSharpIcon from '@mui/icons-material/SearchSharp';
function SearchBar() {
  return (
    <div className='bg-white rounded-lg overflow-hidden flex flex-row items-center justify-between w-auto '>
        <SearchSharpIcon></SearchSharpIcon>
        <input className='no-outline' type="text"/>
    </div>
  )
}

export default SearchBar