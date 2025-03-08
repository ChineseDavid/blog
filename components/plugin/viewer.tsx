"use client";

import * as React from "react";
import highlight from '@bytemd/plugin-highlight';
import gfm from '@bytemd/plugin-gfm';

import { Viewer } from "@bytemd/react";


interface BytemdViewerProps {
  body: string;
}

const plugins = [gfm(), highlight()];

export const BytemdViewer = ({ body }: BytemdViewerProps) => {
  return <Viewer value={body} plugins={plugins} />;
};