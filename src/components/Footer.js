import React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'

const Footer = () => (
  <div>
    <Container fluid style={{marginBottom: '1rem', marginTop: '1rem' }}>
      <Grid>
        <Grid.Column only='computer'>
          <Segment
            style={{padding: '0.2rem'}}
            size='mini' 
            textAlign='center' 
            content='Powered by MondoConnx IT Solutions . All Rights Reserved . Copyright &copy 2018 ' />
        </Grid.Column>
      </Grid>
    </Container>
  </div>
)

export default Footer