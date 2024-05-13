import { FaGear } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { GoChecklist } from "react-icons/go";
import { DialogClose } from "@/components/shadcn/ui/dialog";

import WrapDialog from "../../ui/WrapDialog";

const SupplyDemand = () => {
  return (
    <>
      <div className="h-10 bg-gray-500 p-1.5 text-white flex items-center justify-start gap-2">
        <WrapDialog>
          <button
            key="trigger"
            className="text-sm font-light rounded bg-gray-700 px-1.5 py-1.5  hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <FaGear className="text-white text-lg" />
          </button>
          <div key="header" className="bg-sky-700 flex items-center justify-between">
            <ul className="flex items-center gap-1.5 text-white text-sm py-1.5 px-2 text-center">
              <li className="">
                <a href="#" className="active inline-block w-32 px-1.5 bg-gray-700 border">
                  系統
                </a>
              </li>
              <li className="">
                <a
                  href="#"
                  className="inline-block w-32 px-1.5 hover:bg-gray-600 hover:text-gray-700 border"
                >
                  集計条件
                </a>
              </li>
              <li className="">
                <a
                  href="#"
                  className="inline-block w-32 px-1.5 hover:bg-gray-600 hover:text-gray-700 border"
                >
                  画面表示
                </a>
              </li>
            </ul>

            <div className="mr-3 flex justify-center gap-2">
              <a href="#">
                <FaPlus className="text-white" />
              </a>
              <a href="#">
                <FaStar className="text-white" />
              </a>
              <a href="#">
                <GoChecklist className="text-white" />
              </a>
              <DialogClose>
                <a href="#">
                  <ImCross className="text-white ml-3" />
                </a>
              </DialogClose>
            </div>
          </div>

          {/* 系統条件 */}
          <div key="body" className="text-white px-4 py-4">
            {/* 絞り込み対象 */}
            <div className="flex justify-start gap-3 border p-2 w-6/12 rounded">
              <p className="font-light">絞り込み対象</p>
              <div>|</div>
              <div className="flex items-center">
                <input id="default-radio-1" type="radio" className="w-4 h-4" />
                <label htmlFor="default-radio-1" className="ms-2 text-white">
                  路線
                </label>
              </div>
              <div className="flex items-center">
                <input id="default-radio-1" type="radio" className="w-4 h-4" />
                <label htmlFor="default-radio-1" className="ms-2 text-white">
                  系統
                </label>
              </div>
              <div className="flex items-center">
                <input id="default-radio-1" type="radio" className="w-4 h-4" />
                <label htmlFor="default-radio-1" className="ms-2 text-white">
                  停留所
                </label>
              </div>
              <div className="flex items-center">
                <input id="default-radio-1" type="radio" className="w-4 h-4" />
                <label htmlFor="default-radio-1" className="ms-2 text-white">
                  区間
                </label>
              </div>
              <div className="flex items-center">
                <input id="default-radio-1" type="radio" className="w-4 h-4" />
                <label htmlFor="default-radio-1" className="ms-2 text-white">
                  同一バス停
                </label>
              </div>
            </div>

            <div className="flex justify-start gap-1 h-[370px] pt-2 ">
              {/* 表示路線候補 */}
              <div className="w-6/12">
                <div className="flex justify-end gap-1.5 mb-2">
                  <div className="flex items-center">
                    <input id="default-radio-1" type="radio" className="w-4 h-4" />
                    <label htmlFor="default-radio-1" className="ms-2 text-white">
                      部分
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="default-radio-1" type="radio" className="w-4 h-4" />
                    <label htmlFor="default-radio-1" className="ms-2 text-white">
                      前方
                    </label>
                  </div>
                  <input
                    type="text"
                    className="text-gray-900 rounded border border-input bg-background px-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-0.5"
                  >
                    <option>全て</option>
                    <option value="US">A</option>
                    <option value="CA">B</option>
                    <option value="FR">C</option>
                    <option value="DE">D</option>
                  </select>
                </div>

                <table className="text-left w-full v">
                  <thead className="bg-[#305e81] text-white">
                    <tr>
                      <th className="text-left py-2 px-1 font-light">表示路線候補</th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white text-gray-900 flex flex-col items-center justify-start overflow-y-scroll w-full"
                    style={{ height: "280px" }}
                  >
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2">[0021]直方（高速）福岡</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 路線選択ボタン */}
              <div className="w-1/12 h-full flex justify-center items-center px-1">
                <div>
                  <button className="text-xs rounded bg-gray-100 py-1 text-gray-800 hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-2 w-full">
                    全追加
                  </button>
                  <button className="text-xs rounded bg-gray-100 py-1 text-gray-800 hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-2 w-full">
                    追加
                  </button>
                  <button className="text-xs rounded bg-gray-100 py-1 text-gray-800 hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-2 w-full">
                    削除
                  </button>
                  <button className="text-xs rounded bg-gray-100 py-1 text-gray-800 hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-2 w-full">
                    全削除
                  </button>
                </div>
              </div>

              {/* 選択した系統一覧 */}
              <div className="w-6/12">
                <div className="flex justify-start gap-1.5 mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />
                    <label className="ms-2 text-sm font-light dark:text-gray-300">すべて表示</label>
                  </div>
                  <div className="flex items-center">
                    <input id="default-radio-1" type="radio" className="w-4 h-4" />
                    <label htmlFor="default-radio-1" className="ms-2 text-white">
                      部分
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="default-radio-1" type="radio" className="w-4 h-4" />
                    <label htmlFor="default-radio-1" className="ms-2 text-white">
                      前方
                    </label>
                  </div>
                  <input
                    type="text"
                    className="text-gray-900 rounded border border-input bg-background px-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-0.5"
                  >
                    <option selected>全て</option>
                    <option value="US">A</option>
                    <option value="CA">B</option>
                    <option value="FR">C</option>
                    <option value="DE">D</option>
                  </select>
                </div>

                <table className="text-left w-full">
                  <thead className="bg-[#305e81] text-white flex w-full">
                    <tr className="flex w-full">
                      <th className="text-center py-2 px-1 font-thin border-r w-[50px]">表示</th>
                      <th className="text-left py-2 px-1 font-thin w-full">選択した系統一覧</th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white text-gray-900 flex flex-col items-center justify-start overflow-y-scroll w-full"
                    style={{ height: "280px" }}
                  >
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                    <tr className="flex w-full border-b">
                      <td className="p-2 w-[50px] border-r flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                      </td>
                      <td className="p-2 w-full ">[0021]直方（高速）福岡</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="text-sm font-light py-1 px-10 rounded bg-gray-100 text-gray-800 hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                表示更新
              </button>
            </div>
          </div>
        </WrapDialog>
      </div>
    </>
  );
};

export default SupplyDemand;
