import { useRecoilState, useSetRecoilState } from "recoil";
import { searchKeyAtom } from "@/App";
import { searchAtom } from "@/App";

const Top = () => {
  const [searchKey, setSearchKey] = useRecoilState(searchKeyAtom);
  const setSearch = useSetRecoilState(searchAtom);

  const handleSerchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = { ...searchKey };
    key.limit = parseInt(e.target.value, 10);
    setSearchKey(key);
  };

  const handleSearchClick = () => {
    setSearch(true);
  };

  return (
    <div className="h-10 bg-gray-500 p-1.5 text-white flex items-center justify-start gap-2">
      <label htmlFor="limit">Limit：</label>
      <input
        type="number"
        id="limit"
        className="text-gray-900 rounded border border-input bg-background px-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onChange={(e) => handleSerchKey(e)}
        value={searchKey.limit}
      />
      <button
        onClick={handleSearchClick}
        className="text-sm font-medium rounded bg-gray-100 px-4 py-0.4 text-gray-800 hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        検索
      </button>
    </div>
  );
};

export default Top;
