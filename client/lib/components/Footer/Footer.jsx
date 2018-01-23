import React, { Component } from 'react'
import { FooterContainer, FooterLine, FooterLink } from './Footer.style'

class Footer extends Component {
  render () {
    return (
      <FooterContainer>
        <FooterLine>
          <FooterLink href="https://www.libertymutualgroup.com/omapps/ContentServer?pagename=LMGroup/Views/lmgDisclosure&cid=1138362980102">Privacy Policy</FooterLink> |&nbsp;
          <FooterLink href="http://www.libertymutualgroup.com/omapps/ContentServer?pagename=LMGroup/Views/lmgDisclosure&cid=1240002784964">Security Policy</FooterLink> |&nbsp;
          <FooterLink href="https://www.libertymutualgroup.com/omapps/ContentServer?pagename=LMGroup/Views/lmgDisclosure&cid=1138366154501">Terms & Conditions</FooterLink> |&nbsp;
          <FooterLink href="https://www.libertymutualgroup.com/omapps/ContentServer?pagename=LMGroup/Views/lmgDisclosure&cid=1138366406840">Fraud Protection</FooterLink> |&nbsp;
          <FooterLink href="http://public.libertymutual-cdn.com/PmEService/MediaAssets/pages/terms-and-conditions-enrollment.html">eService & Paperless Terms & Conditions</FooterLink>
        </FooterLine>
        <FooterLine>
            © 2017 Liberty Mutual Insurance Company, 175 Berkeley Street, Boston, MA 02116
        </FooterLine>
      </FooterContainer>
    )
  }
}

export default Footer
