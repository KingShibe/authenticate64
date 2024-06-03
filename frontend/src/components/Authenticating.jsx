import { Heading, Spinner, Stack, Box } from '@chakra-ui/react'

export const Authenticating = ({showAuthenticating}) => {
  
    if(!showAuthenticating){
        return <></>;
    }

  return (
    <>
      <Heading fontFamily={'Poppins'} fontWeight={'bold'} color={'white'} fontSize={'24px'}>
        Authenticating
      </Heading>
        
      <Box
      p={4}
      borderRadius={'md'}
      color={'white'}
      minW={'388px'}  
      minH={'320px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
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
          spacing={6}>
              <Spinner size='xl' color={'brandGreen'} />
              <Heading fontFamily={'Poppins'} fontWeight={'semibold'} color={'white'} fontSize={'18px'}>
                Please Wait...
              </Heading>
          </Stack>
        </Box>
      </Box>
    </>
  );
};