import { Heading, Text, Stack, Box, Image, Button } from '@chakra-ui/react'
import HappyEmoji  from '../assets/reshot-icon-haha.svg'
import SadEmoji  from '../assets/reshot-icon-sad.svg'

export const Results = ({ showResults, isReal, confidence, setShowUpload, setShowResults }) => {

    const backToUploadButton = async () => {
        setShowUpload(true);
        setShowResults(false);
    }
  
    if(!showResults){
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
              <Image src={HappyEmoji} alt='Happy Emoji' boxSize='115px' hidden={!isReal}/>
              <Image src={SadEmoji} alt='Sad Emoji' boxSize='115px' hidden={isReal}/>
              <Heading fontFamily={'Poppins'} fontWeight={'semibold'} color={'white'} fontSize={'18px'}>
                Your N64 game is <Text as={'a'} hidden={!isReal}>real!</Text> <Text as={'a'} hidden={isReal}>fake</Text>
              </Heading>
              <Heading fontFamily={'Poppins'} fontWeight={'semibold'} color={'white'} fontSize={'14px'} mt={-2}>
                Confidence: {confidence}%
              </Heading>
              <Text textAlign="center" fontFamily={'Poppins'} fontWeight={'medium'} color={'textGrey'} fontSize={'11px'}>
                This is based off of authenticate64's CNN trained on N64 game<br/>cartridges with a <Text as={'a'} color={'brandGreen'}>95% testing accuracy</Text>. Because our model isn't<br/>100% accurate, it is important that you use this knowledge in<br/>adherence with our Terms of Service.
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