import { useState, useRef } from 'react'
import { Checkbox, Text, Heading, Button, Stack, Box, Input } from '@chakra-ui/react'
import { FaFileUpload } from "react-icons/fa";

export const Upload = ({showUpload, onTOSModalOpen, setShowAuthenticating, setShowUpload, setShowResults, setIsReal, setShowError}) => {
    const [checkboxIsInvalid, setCheckboxIsInvalid] = useState(false);
    const [dropzoneBorderColor, setDropzoneBorderColor] = useState('brandPurple');
    const [imageFile, setImageFile] = useState(undefined);
    const tosCheckboxRef = useRef();
    const fileUploadInputRef = useRef();

    const checkboxOnChangeEvent = () => {
        if(tosCheckboxRef.current.checked === true){
            setCheckboxIsInvalid(false);
        }
    }

    const dropzoneOnClickEvent = () => {
        fileUploadInputRef.current.click();
    }

    const dropzoneOnDragOverEvent = (event) => {
        event.preventDefault();
        setDropzoneBorderColor('brandGreen');
    } 

    const dropzoneOnDragLeaveEvent = () => {
        setDropzoneBorderColor('brandPurple');
    }

    const dropzoneInputOnChangeEvent = (event) => {
        handleUploadedFile(event.target.files[0]);
    }

    const dropzoneOnDropEvent = (event) => {
        event.preventDefault();
        handleUploadedFile(event.dataTransfer.files[0]);
    }

    const handleUploadedFile = (file) => {
        if(file === undefined){
            return;
        }

        //  Maximum file upload size in decimal (1 mb = 1000 * 1000 bytes)
        if(file.size > (10 * 1000 * 1000)){
            setDropzoneBorderColor('red');
            setImageFile(undefined);
            return;
        }

        if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
            setDropzoneBorderColor('red');
            setImageFile(undefined);
            return;
        }

        setDropzoneBorderColor('brandGreen');
        setImageFile(file);
    }

    const resetUploadComponent = () => {
        setCheckboxIsInvalid(false);
        setDropzoneBorderColor('brandPurple');
        setImageFile(undefined);
    }

    const uploadButton = async () => {
        if(tosCheckboxRef.current.checked === false || imageFile === undefined){
            if(tosCheckboxRef.current.checked === false) setCheckboxIsInvalid(true);
            if(imageFile === undefined) setDropzoneBorderColor('red');
            return;
        }
        
        setShowAuthenticating(true);
        setShowUpload(false);
        resetUploadComponent();

        const formDataPayload = new FormData();
        formDataPayload.append('image', imageFile);

        try{
            const respone = await fetch('https://api.authenticate64.com/verify', {
                method: 'POST',
                body: formDataPayload
            });
    
            if(respone.status === 200){
                const jsonResponse = await respone.json();
                setIsReal(jsonResponse.isReal);
                setShowResults(true);
                setShowAuthenticating(false);
            }else{
                setShowError(true);
                setShowAuthenticating(false);
            }
        }catch{
            setShowError(true);
            setShowAuthenticating(false);
        }

        // ---- Start test code ----
        // setTimeout(() => {
        //     setIsReal(false);
        //     setShowResults(true);
        //     setShowAuthenticating(false);
        // }, "3000");
        // ---- End test code ----
    }

    if(!showUpload){
        return <></>;
    }

    return (
    <>
        <Heading fontFamily={'Poppins'} fontWeight={'bold'} color={'white'} fontSize={'24px'}>
            Upload
        </Heading>
        
        <Box
        p={4}
        id='dropZone'
        border={'2px dashed'}
        borderColor={dropzoneBorderColor}
        borderRadius={'md'}
        color={'white'}
        minW={'388px'}  
        minH={'269px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        onDragOver={dropzoneOnDragOverEvent}
        onDragLeave={dropzoneOnDragLeaveEvent}
        onDrop={dropzoneOnDropEvent}
        onClick={dropzoneOnClickEvent}
        cursor={'pointer'}
        >
            <Box
            minW={'268px'}  
            minH={'113px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            >
            <Stack
            justify={'center'}
            align={'center'}
            w={'100%'}
            h={'100%'}>
                <FaFileUpload color='#00FFA2' size={'39px'} align={'center'}/>
                <Heading fontFamily={'Poppins'} fontWeight={'semibold'} color={'white'} fontSize={'18px'}>
                    Drop File Here
                </Heading>
                <Text textAlign="center" fontFamily={'Poppins'} fontWeight={'medium'} color={'textGrey'} fontSize={'12px'}>
                    Drag and drop a <Text as={'a'} color={'brandGreen'}>JPG</Text> or <Text as={'a'} color={'brandGreen'}>PNG</Text> image<br/>of the back of your N64 game cartridge here
                </Text>
                <Input type={'file'} ref={fileUploadInputRef} onChange={dropzoneInputOnChangeEvent} hidden={true}/>
            </Stack>
            </Box>
        </Box>

        <Stack spacing={4}>
        <Checkbox colorScheme={'brandGreenScheme'} ref={tosCheckboxRef} onChange={checkboxOnChangeEvent} isInvalid={checkboxIsInvalid}>
            <Text textAlign="center" fontFamily={'Poppins'} fontWeight={'medium'} color={'textGrey'} fontSize={'11px'}>
            By checking this box, I agree that I have read the <Text as={'a'} color={'brandGreen'} onClick={onTOSModalOpen}>Terms of Service</Text>
            </Text>
        </Checkbox>
        <Button
        bg={'brandPurple'}
        color={'white'}
        w="full"
        onClick={uploadButton}
        _hover={{
            bg: 'brandPurpleHover',
        }}>
        Upload
        </Button>
        </Stack>
    </>
);
};