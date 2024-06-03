import { Heading, Text, Stack, Box, Image, Button } from '@chakra-ui/react'
import AngryEmoji  from '../assets/reshot-icon-angry.svg'

export const Error = ({ showError, setShowUpload, setShowError }) => {

    const backToUploadButton = async () => {
        setShowUpload(true);
        setShowError(false);
    }
  
    if(!showError){
        return <></>;
    }

  return (
    <>
      <Box
      p={4}
      borderRadius={'md'}
      color={'white'}
      minW={'388px'}  
      minH={'320px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      mb={5}
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
          h={'100%'}
          spacing={4}>
              <Image src={AngryEmoji} alt='Angry Emoji' boxSize='115px'/>
              <Heading fontFamily={'Poppins'} fontWeight={'semibold'} color={'white'} fontSize={'18px'}>
                An Error Has Occurred
              </Heading>
              <Text textAlign="center" fontFamily={'Poppins'} fontWeight={'medium'} color={'textGrey'} fontSize={'11px'}>
                Something went wrong and we aren't quite sure why.<br/>Try <Text as={'a'} color={'brandGreen'}>uploading again</Text> or <Text as={'a'} color={'brandGreen'}>comeback later</Text>. If issues persist,<br/>please create an issue on <Text as={'a'} color={'brandGreen'}>GitHub</Text>.
              </Text>
          </Stack>
        </Box>
      </Box>

      <Stack>
        <Button
          bg={'brandPurple'}
          color={'white'}
          w="full"
          onClick={backToUploadButton}
          _hover={{
            bg: 'brandPurpleHover',
          }}>
          Back To Upload
        </Button>
      </Stack>
    </>
  );
};