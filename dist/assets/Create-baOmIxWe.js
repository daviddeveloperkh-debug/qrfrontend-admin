import { n as N, r as i, j as r, R as B, B as p } from './index-bjzi2NvD.js'
import { a as P } from './modals-CKxuF1KC.js'
import { S as R } from './Select-CY1WXg3P.js'
import { h as k } from './DefaultLayout-DrDCyHef.js'
import { r as E, c as L } from './utils-Cl87-n4L.js'
import { a as b, b as V } from './index.esm-BX2-GJNA.js'
import { C as m } from './CFormInput-C336hbw-.js'
import { c as D } from './cil-copy-Bwuh4VF6.js'
import { C as I } from './CCard-R4u2YyXY.js'
import { C as M } from './CCardBody-BY8Sxn6x.js'
import { C as T } from './CForm-DnX0btTe.js'
import { C as A } from './CCol-DszJQxcp.js'
import { C as Q } from './CCardFooter-D4YFsGe1.js'
import { C as $ } from './CLoadingButton-CoARBVM3.js'
import './auth-gSn_sS9R.js'
const ae = () => {
  var g
  const v = N()
  i.useRef(null)
  const { create: y, createLoading: h } = P(),
    [o, u] = i.useState({}),
    [w, f] = i.useState(!1),
    c = (e) => {
      const { name: a, value: t } = e.target
      u({ ...o, [a]: t })
    },
    C = (e, a) => {
      u({ ...o, [e]: a })
    },
    [z, S] = i.useState(''),
    q = () => {
      const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ123456789',
        t = Array.from({ length: 10 }, () => a[Math.floor(Math.random() * a.length)]).join('')
      S(t), C('password', t)
    },
    n = [
      {
        children: r.jsx(m, {
          name: 'name',
          value: o.name,
          onChange: c,
          required: !0,
          label: 'Имя',
        }),
      },
      {
        children: r.jsx(R, {
          options:
            (g = E) == null
              ? void 0
              : g.map((e) => ({
                  label: e == null ? void 0 : e.label,
                  value: e == null ? void 0 : e.value,
                })),
          value: o == null ? void 0 : o.role,
          onChange: (e) => C('role', e),
          label: 'Роль',
          required: !0,
        }),
      },
      {
        children: r.jsx(m, {
          name: 'login',
          value: o.login,
          onChange: c,
          required: !0,
          label: 'Логин',
        }),
      },
      {
        label: 'Пароль',
        children: r.jsxs('div', {
          className: 'position-relative',
          children: [
            r.jsx(m, {
              name: 'password',
              value: o.password,
              onChange: c,
              style: { width: '65%' },
              label: 'Пароль',
            }),
            r.jsxs('div', {
              className: 'd-flex align-items-center gap-3 mt-2',
              style: { position: 'absolute', bottom: '0', right: '0' },
              children: [
                r.jsx(b, {
                  color: 'primary',
                  onClick: () => L(o == null ? void 0 : o.password),
                  children: r.jsx(V, { icon: D, title: 'Скопировать' }),
                }),
                r.jsx(b, { color: 'primary', onClick: q, children: 'Создать пароль' }),
              ],
            }),
          ],
        }),
      },
    ],
    F = (e) => {
      var t
      if ((e.preventDefault(), e.currentTarget.checkValidity() === !1))
        e.preventDefault(),
          e.stopPropagation(),
          n
            .filter((l) => l.children.props.required)
            .map((l) => {
              var j
              const s = l.children.props.value,
                x = l.children.props.label
              ;((j = l.children.props.options) == null ? void 0 : j.length) > 0
                ? ((s == null ? void 0 : s.value) === void 0 ||
                    (s == null ? void 0 : s.value) === null ||
                    (s == null ? void 0 : s.value) === '') &&
                  p.error(`${x} - To\'ldiring`)
                : (s == null || s === '') && p.error(`${x} - To\'ldiring`)
            })
      else {
        const d = { ...o }
        ;(d.role = ((t = o.role) == null ? void 0 : t.value) || null),
          f(!0),
          y(d)
            .then((l) => {
              p.success('Muvaffaqiyatli yaratildi'), v('/admins' + k), f(!1)
            })
            .catch((l) => console.log('err', l))
      }
    }
  return r.jsx(I, {
    children: r.jsx(M, {
      children: r.jsxs(T, {
        noValidate: !0,
        validated: w,
        onSubmit: F,
        className: 'row g-3',
        children: [
          n == null
            ? void 0
            : n.map((e, a) =>
                r.jsx(
                  A,
                  {
                    sm: 6,
                    children: B.cloneElement(e.children, {
                      label: r.jsxs(r.Fragment, {
                        children: [
                          e.children.props.label,
                          ' ',
                          e.children.props.required &&
                            r.jsx('span', { style: { color: 'red' }, children: '*' }),
                        ],
                      }),
                    }),
                  },
                  a,
                ),
              ),
          r.jsx(Q, {
            className: 'text-end',
            children: r.jsx($, {
              color: 'primary',
              loading: h,
              disabled: h,
              type: 'submit',
              children: 'Создать',
            }),
          }),
        ],
      }),
    }),
  })
}
export { ae as default }
