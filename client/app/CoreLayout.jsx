import { childrenPropTypes } from 'lib/util/commonPropTypes'
import React from 'react'
import View from 'app/View'
import { Footer } from 'lib/components'

const CoreLayout = (props) => (
  <View>
    {props.children}
    <Footer />
  </View>
)

CoreLayout.propTypes = {
  children: childrenPropTypes,
}

export default CoreLayout
