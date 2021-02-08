import { IMusicItem } from "src/types";
import React from "react";
import moment from "moment";

export default [
  {
    title: "#",
    key: "tIndex",
    render: (_: any, record: IMusicItem, index: number) => (
      <span>{index + 1}</span>
    ),
  },
  {
    title: "歌名",
    key: "title",
    dataIndex: "title",
  },
  {
    title: "歌手",
    key: "singer",
    dataIndex: "singer",
  },
  {
    title: "歌词",
    key: "lyrics",
    dataIndex: "lyrics",
    render: (lyrics: string) => {
      return <span>lyrics</span>;
    },
  },
  {
    title: "海报",
    key: "poster",
    dataIndex: "poster",
    render: (poster: string) => {
      return (
        <img
          src={poster}
          alt="海报"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      );
    },
  },
  {
    title: "链接",
    key: "url",
    dataIndex: "url",
    // render: (url: string) => {
    //   return (<a href={STATIC_URL + url}>{STATIC_URL + url}</a>)
    // }
  },
  {
    title: "修改日期",
    dataIndex: "update_at",
    key: "update_at",
    render: (t: Date) => <span>{moment(t).format("YYYY-MM-DD HH:mm:ss")}</span>,
  },
];
