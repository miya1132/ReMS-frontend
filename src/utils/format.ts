const format = {
  //-------------------------------------------------------
  // 現在の日時を文字列で返す
  get_formated_time: (_fmt: string = "YYYY/MM/DD hh:mm:ss.iii", _dt: Date = new Date()) => {
    return [
      ["YYYY", _dt.getFullYear()],
      ["MM", _dt.getMonth() + 1],
      ["DD", _dt.getDate()],
      ["hh", _dt.getHours()],
      ["mm", _dt.getMinutes()],
      ["ss", _dt.getSeconds()],
      ["iii", _dt.getMilliseconds()],
    ].reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (s, a: any) => s.replace(a[0], `${a[1]}`.padStart(a[0].length, "0")),
      _fmt,
    );
  },
};

export default format;
