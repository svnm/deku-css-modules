import test from 'ava'
import { CSSModules, styles, myFunc } from '../lib/dekucssmodules.js'

test('styles object is defined', t => {
  t.same(styles, {})
})
