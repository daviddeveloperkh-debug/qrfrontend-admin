import { F as B, n as D, r as i, j as o, R as k, B as d } from './index-bjzi2NvD.js'
import { a as I } from './modals-CKxuF1KC.js'
import { S as R } from './Select-CY1WXg3P.js'
import { h as T } from './DefaultLayout-DrDCyHef.js'
import { E as V } from './Error403-B8q-ZZUK.js'
import { P as M } from './PageLoading-4CGMC8IO.js'
import { r as b, c as A } from './utils-Cl87-n4L.js'
import { b as H } from './index.esm-BX2-GJNA.js'
import { C as f } from './CFormInput-C336hbw-.js'
import { a as v, C as Q } from './CLoadingButton-CoARBVM3.js'
import { c as $ } from './cil-copy-Bwuh4VF6.js'
import { C as z } from './CCard-R4u2YyXY.js'
import { C as G } from './CCardHeader-NjExkzpA.js'
import { C as J } from './CCardTitle-BIeRUkou.js'
import { C as K } from './CCardBody-BY8Sxn6x.js'
import { C as O } from './CForm-DnX0btTe.js'
import { C as U } from './CCol-DszJQxcp.js'
import { C as W } from './CCardFooter-D4YFsGe1.js'
import './auth-gSn_sS9R.js'
import './useForkedRef-CzJsXXcR.js'
import './Transition-L9PLBMST.js'
const xr = () => {
  var x
  const { id: m } = B(),
    y = D(),
    { detail: e, getDetail: w, detailLoading: S, edit: E, editLoading: C } = I(),
    [l, p] = i.useState({}),
    [q, F] = i.useState(!1),
    u = (r) => {
      const { name: n, value: t } = r.target
      p({ ...l, [n]: t })
    },
    g = (r, n) => {
      p({ ...l, [r]: n })
    },
    [X, P] = i.useState(''),
    N = () => {
      const n = 'abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ123456789',
        t = Array.from({ length: 10 }, () => n[Math.floor(Math.random() * n.length)]).join('')
      P(t), g('password', t)
    }
  i.useEffect(() => {
    w(m)
  }, [m]),
    i.useEffect(() => {
      p(() => {
        var r, n
        return {
          name: e == null ? void 0 : e.name,
          login: e == null ? void 0 : e.login,
          role: {
            label: e == null ? void 0 : e.role,
            value:
              (n =
                (r = b) == null
                  ? void 0
                  : r.find((t) => t.label === (e == null ? void 0 : e.role))) == null
                ? void 0
                : n.value,
          },
        }
      })
    }, [e]),
    console.log(l)
  const c = [
      {
        children: o.jsx(f, {
          name: 'name',
          value: l.name,
          onChange: u,
          required: !0,
          label: 'Имя',
        }),
      },
      {
        children: o.jsx(R, {
          options:
            (x = b) == null
              ? void 0
              : x.map((r) => ({
                  label: r == null ? void 0 : r.label,
                  value: r == null ? void 0 : r.value,
                })),
          value: l == null ? void 0 : l.role,
          onChange: (r) => g('role', r),
          label: 'Роль',
          required: !0,
        }),
      },
      {
        children: o.jsx(f, {
          name: 'login',
          value: l.login,
          onChange: u,
          required: !0,
          label: 'Логин',
        }),
      },
      {
        label: 'Пароль',
        children: o.jsxs('div', {
          className: 'position-relative',
          children: [
            o.jsx(f, {
              name: 'password',
              value: l.password,
              onChange: u,
              style: { width: '65%' },
              label: 'Пароль',
            }),
            o.jsxs('div', {
              className: 'd-flex align-items-center gap-3 mt-2',
              style: { position: 'absolute', bottom: '0', right: '0' },
              children: [
                o.jsx(v, {
                  color: 'primary',
                  onClick: () => A(l == null ? void 0 : l.password),
                  children: o.jsx(H, { icon: $, title: 'Скопировать' }),
                }),
                o.jsx(v, { color: 'primary', onClick: N, children: 'Создать пароль' }),
              ],
            }),
          ],
        }),
      },
    ],
    L = (r) => {
      var t
      if ((r.preventDefault(), r.currentTarget.checkValidity() === !1))
        r.preventDefault(),
          r.stopPropagation(),
          c
            .filter((s) => s.children.props.required)
            .map((s) => {
              var j
              const a = s.children.props.value
              ;((j = s.children.props.options) == null ? void 0 : j.length) > 0
                ? ((a == null ? void 0 : a.value) === void 0 ||
                    (a == null ? void 0 : a.value) === null ||
                    (a == null ? void 0 : a.value) === '') &&
                  d.error(`${s.label} - To\'ldiring`)
                : (a == null || a === '') && d.error(`${s.label} - To\'ldiring`)
            })
      else {
        const h = { ...l }
        ;(h.role = ((t = l.role) == null ? void 0 : t.value) || null),
          E(m, h)
            .then((s) => {
              var a
              s != null && s.success
                ? (d.success("Muvaffaqiyatli o'zgardi"), y('/admins' + T))
                : d.error((a = s == null ? void 0 : s.error) == null ? void 0 : a.message)
            })
            .catch((s) => console.log('err', s))
      }
      F(!0)
    }
  return S
    ? o.jsx(M, { loading: !0 })
    : e != null && e.id
      ? o.jsxs(z, {
          children: [
            o.jsx(G, {
              children: o.jsxs(J, {
                className: 'mb',
                children: [e == null ? void 0 : e.name, ' ( ID: ', e == null ? void 0 : e.id, ' )'],
              }),
            }),
            o.jsx(K, {
              children: o.jsxs(O, {
                noValidate: !0,
                validated: q,
                onSubmit: L,
                className: 'row g-3',
                children: [
                  c == null
                    ? void 0
                    : c.map((r, n) =>
                        o.jsx(
                          U,
                          {
                            sm: 6,
                            children: k.cloneElement(r.children, {
                              label: o.jsxs(o.Fragment, {
                                children: [
                                  r.children.props.label,
                                  ' ',
                                  r.children.props.required &&
                                    o.jsx('span', { style: { color: 'red' }, children: '*' }),
                                ],
                              }),
                            }),
                          },
                          n,
                        ),
                      ),
                  o.jsx(W, {
                    className: 'text-end',
                    children: o.jsx(Q, {
                      color: 'primary',
                      loading: C,
                      disabled: C,
                      type: 'submit',
                      children: 'Изменить',
                    }),
                  }),
                ],
              }),
            }),
          ],
        })
      : o.jsx(V, { detail: e })
}
export { xr as default }
