import {
    FileUpload,
    useFileUploadContext,
    Float,
    Box,
    Icon
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  import { LuUpload, LuX } from "react-icons/lu";
  
  function FilePreview({ onFileChange }) {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
  
    useEffect(() => {
      const file = files[0] || null;
      onFileChange(file);
    }, [files, onFileChange]);
  
    if (files.length === 0) return null;
  
    return (
      <FileUpload.ItemGroup>
        {files.map((file) => (
          <FileUpload.Item
            key={file.name}
            file={file}
            w="full"
            h="48"
            position="relative"
            borderRadius="md"
            overflow="hidden"
          >
            <FileUpload.ItemPreviewImage
              objectFit="cover"
              w="full"
              h="full"
            />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger
                boxSize="6"
                layerStyle="fill.solid"
                zIndex="1"
                m="2"
                bg="white"
                borderRadius="full"
              >
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    );
  }
  
  const ImageUploader = ({ onFileChange }) => {
    return (
      <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1}>
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone h="40">
          <Icon as={LuUpload} boxSize="6" color="fg.muted" />
          <FileUpload.DropzoneContent>
            <Box>Drag and drop files here</Box>
            <Box color="fg.muted">.png, .jpg up to 5MB</Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
  
        <FilePreview onFileChange={onFileChange} />
      </FileUpload.Root>
    );
  };
  
  export default ImageUploader;
  