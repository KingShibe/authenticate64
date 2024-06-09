import { useState } from 'react'
import { Text, useDisclosure, Heading, Stack, Box } from '@chakra-ui/react'
import { Upload } from "./components/Upload.jsx";
import { HelpModal } from "./components/HelpModal.jsx";
import { TOSModal } from "./components/TOSModal.jsx";
import { Authenticating } from "./components/Authenticating.jsx";
import { Results } from "./components/Results.jsx";
import { Error } from "./components/Error.jsx";

function App() {
  const { isOpen: isTOSModalOpen, onOpen: onTOSModalOpen, onClose: onTOSModalClose } = useDisclosure();
  const { isOpen: isHelpModalOpen, onOpen: onHelpModalOpen, onClose: onHelpModalClose } = useDisclosure();
  const [showUpload, setShowUpload] = useState(true);
  const [showAuthenticating, setShowAuthenticating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isReal, setIsReal] = useState(true);
  const [confidence, setConfidence] = useState(0.0);

  document.body.style.overflow = "hidden";

  return (
    <Box as={'div'} bg={'backgroundGrey'} minH={'100vh'}>

      <HelpModal isHelpModalOpen={isHelpModalOpen} onHelpModalClose={onHelpModalClose} />
      <TOSModal isTOSModalOpen={isTOSModalOpen} onTOSModalClose={onTOSModalClose} />

      <Heading p={'20px'} align={'left'} justify={'left'} fontFamily={'Poppins'} fontWeight={'bold'} color={'white'} fontSize={'29px'}>
        authenticate <Text as={'a'} color={'brandGreen'}>64</Text>
      </Heading>
      
      <Stack
        spacing={4}
        position={'fixed'}
        top={'45%'}
        left={'50%'}
        transform="translate(-50%, -50%)"
        minW={'422px'}
        minH={'441px'}
        bg={'panelGrey'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
          
        <Upload showUpload={showUpload} onTOSModalOpen={onTOSModalOpen} setShowAuthenticating={setShowAuthenticating} setShowUpload={setShowUpload} setShowResults={setShowResults} setIsReal={setIsReal} setConfidence={setConfidence} setShowError={setShowError} onHelpModalOpen={onHelpModalOpen}/>

        <Authenticating showAuthenticating={showAuthenticating} />

        <Results showResults={showResults} isReal={isReal} confidence={confidence} setShowUpload={setShowUpload} setShowResults={setShowResults}/>
        
        <Error showError={showError} setShowUpload={setShowUpload} setShowError={setShowError}/>

      </Stack>
    </Box>
  )
}

export default App