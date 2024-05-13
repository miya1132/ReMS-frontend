const AggregateCondition = () => {
  return (
    <>
      <div className="absolute bottom-1 left-1 w-[320px] h-[140px] bg-white border border-gray-400 rounded text-gray-900 p-0.5">
        <p>系統・集計条件</p>
        <div className="flex items-center justify-start">
          <div className="w-[55px] bg-blue-200 text-center m-0.5 h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]">系統</span>
          </div>
          <div className="w-[250px] leading-[0.7rem] truncate">
            <span className="text-[0.7rem]">
              [363151][47-1]那珂川営業所～南警察署・駅あああ前四
            </span>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="w-[55px] bg-blue-200 text-center m-0.5 h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem] ">集計期間</span>
          </div>
          <div className="w-[250px] h-[15px] leading-[0.7rem] truncate">
            <span className="text-[0.7rem]">2024-05-01_17:50 - 2024-05-03_18:00</span>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="w-[55px] bg-blue-200 text-center m-0.5 h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]">集計単位</span>
          </div>
          <div className="w-[100px] h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem] ">時</span>
          </div>
          <div className="w-[60px] bg-blue-200 text-center m-0.5 h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]">時間帯集計</span>
          </div>
          <div className="h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]">-</span>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="w-[55px] bg-blue-200 text-center m-0.5 h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]">曜日</span>
          </div>
          <div className="w-[250px] h-[15px] leading-[0.7rem] truncate">
            <span className="text-[0.7rem]"></span>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="w-[55px] bg-blue-200 text-center m-0.5 h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]">券種</span>
          </div>
          <div className="w-[250px] h-[15px] leading-[0.7rem] truncate">
            <span className="text-[0.7rem]"></span>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="w-[55px] bg-blue-200 text-center m-0.5 h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]">性別</span>
          </div>
          <div className="w-[100px] h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]"></span>
          </div>
          <div className="w-[65px] bg-blue-200 text-center m-0.5 h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]">世代</span>
          </div>
          <div className="h-[15px] leading-[0.7rem]">
            <span className="text-[0.7rem]"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AggregateCondition;
