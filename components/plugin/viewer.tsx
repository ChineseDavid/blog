"use client";

import * as React from "react";

import { Viewer } from "@bytemd/react";


interface BytemdViewerProps {
  body: string;
}

export const BytemdViewer = ({ body }: BytemdViewerProps) => {
  return <Viewer value={body} />;
};