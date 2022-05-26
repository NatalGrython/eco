import React, { FC, CSSProperties } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import classNames from "./index.module.scss";

interface DropzoneProps {
  file: string;
  widthPreview: string;
  heightPreview: string;
  onDrop:
    | (<T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
      ) => void)
    | undefined;
  error?: string;
}

const createPreviewStyle = (
  imagePath: string,
  widthPreview: string,
  heightPreview: string
): CSSProperties => ({
  backgroundImage: `url("${imagePath}")`,
  width: widthPreview,
  height: heightPreview,
  backgroundSize: "cover",
});

const Dropzone: FC<DropzoneProps> = ({
  file,
  widthPreview,
  heightPreview,
  onDrop,
  error,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={
        !error
          ? classNames.dropdown__container
          : `${classNames.dropdown__container} ${classNames.dropdown__error}`
      }
    >
      <input {...getInputProps()} />
      {file !== "" && (
        <div style={createPreviewStyle(file, widthPreview, heightPreview)} />
      )}
      {error && <span className={classNames.error_text}>{error}</span>}
    </div>
  );
};

export default Dropzone;
