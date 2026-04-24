import { n as M, r as f, j as r, R, B as m } from './index-bjzi2NvD.js'
import { u as F, w as L } from './modals-CKxuF1KC.js'
import { h as P } from './DefaultLayout-DrDCyHef.js'
import { C as n } from './CFormInput-C336hbw-.js'
import { C as b } from './CDatePicker-C3Z-gM9k.js'
import { a as U } from './index.esm-BX2-GJNA.js'
import { C as B } from './CCard-R4u2YyXY.js'
import { C as I } from './CCardBody-BY8Sxn6x.js'
import { C as k } from './CForm-DnX0btTe.js'
import { C as E } from './CCol-DszJQxcp.js'
import { C as V } from './CCardFooter-D4YFsGe1.js'
import { C as W } from './CLoadingButton-CoARBVM3.js'
import { f as h, p as j } from './parse-n3RXTkBv.js'
import './auth-gSn_sS9R.js'
import './useForkedRef-CzJsXXcR.js'
import './CFocusTrap-CtPSLGIl.js'
const ie = () => {
  const D = M(),
    p = f.useRef(null),
    { create: v, createLoading: g } = F(),
    { getStatics: $, statics: H, staticsLoading: O } = L(),
    [a, s] = f.useState({}),
    [q, C] = f.useState(!1),
    o = (e) => {
      const { name: i, value: u } = e.target
      s({ ...a, [i]: u })
    },
    c = (e, i) => {
      s({ ...a, [e]: i })
    },
    w = (e) => {
      e.target.files.length > 0 && s((i) => ({ ...i, file: e.target.files[0] }))
    },
    N = () => {
      s((e) => ({ ...e, file: null })), p.current && (p.current.value = '')
    },
    d = [
      {
        children: r.jsx(n, {
          name: 'given',
          value: a.given,
          onChange: o,
          required: !0,
          label: 'Данный',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'firstName',
          value: a.firstName,
          onChange: o,
          required: !0,
          label: 'Имя',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'lastName',
          value: a.lastName,
          onChange: o,
          required: !0,
          label: 'Фамилия',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'patronymic',
          value: a.patronymic,
          onChange: o,
          required: !0,
          label: 'Отчество',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'specialty',
          value: a.specialty,
          onChange: o,
          required: !0,
          label: 'Специализация',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'qualification',
          value: a.qualification,
          onChange: o,
          required: !0,
          label: 'Квалификация',
        }),
      },
      {
        children: r.jsx(b, {
          date: a.birthDate ? new Date(a.birthDate) : null,
          inputDateParse: (e) => j(e, 'yyyy-MM-dd', new Date()),
          inputDateFormat: (e) => h(new Date(e), 'yyyy-MM-dd'),
          onDateChange: (e) => {
            if (e) {
              const i = h(new Date(e), 'yyyy-MM-dd')
              c('birthDate', i)
            } else c('birthDate', '')
          },
          placeholder: 'Выберите время',
          locale: 'en-US',
          required: !0,
          label: 'Дата рождения',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'passportNumber',
          value: a.passportNumber,
          onChange: o,
          required: !0,
          label: 'Номер паспорта',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'certificateNumber',
          value: a.certificateNumber,
          onChange: o,
          required: !0,
          label: 'Номер сертификата',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'protocolNumber',
          value: a.protocolNumber,
          onChange: o,
          required: !0,
          label: 'Номер протокола',
        }),
      },
      {
        children: r.jsx(b, {
          date: a.protocolRegistrationDate ? new Date(a.protocolRegistrationDate) : null,
          inputDateParse: (e) => j(e, 'yyyy-MM-dd', new Date()),
          inputDateFormat: (e) => h(new Date(e), 'yyyy-MM-dd'),
          onDateChange: (e) => {
            if (e) {
              const i = h(new Date(e), 'yyyy-MM-dd')
              c('protocolRegistrationDate', i)
            } else c('protocolRegistrationDate', '')
          },
          placeholder: 'Выберите время',
          locale: 'en-US',
          required: !0,
          label: 'Дата регистрации протокола',
        }),
      },
      {
        children: r.jsx(n, {
          name: 'commissionChairman',
          value: a.commissionChairman,
          onChange: o,
          required: !0,
          label: 'Председатель комиссии',
        }),
      },
      {
        children: r.jsxs(r.Fragment, {
          children: [
            r.jsx(n, { ref: p, type: 'file', onChange: (e) => w(e), label: 'Картинка' }),
            r.jsx(U, { color: 'danger', onClick: N, children: 'Удалить' }),
            (a == null ? void 0 : a.file) &&
              r.jsx('div', {
                className: 'w-100 mt-2',
                children: r.jsx('img', {
                  src: URL.createObjectURL(a.file),
                  alt: 'Uploaded',
                  style: { maxWidth: '100%', maxHeight: '500px' },
                }),
              }),
          ],
        }),
      },
    ],
    S = (e) => {
      if ((e.preventDefault(), e.currentTarget.checkValidity() === !1))
        e.preventDefault(),
          e.stopPropagation(),
          d
            .filter((l) => l.children.props.required)
            .map((l) => {
              var x
              const t = l.children.props.value,
                y = l.children.props.label
              ;((x = l.children.props.options) == null ? void 0 : x.length) > 0
                ? ((t == null ? void 0 : t.value) === void 0 ||
                    (t == null ? void 0 : t.value) === null ||
                    (t == null ? void 0 : t.value) === '') &&
                  m.error(`${y} - To\'ldiring`)
                : (t == null || t === '') && m.error(`${y} - To\'ldiring`)
            })
      else {
        const u = { ...a }
        C(!0),
          v(u)
            .then((l) => {
              var t
              l != null && l.success
                ? (m.success('Muvaffaqiyatli yaratildi'), D('/user' + P), C(!1))
                : m.error((t = l == null ? void 0 : l.error) == null ? void 0 : t.message)
            })
            .catch((l) => console.log('err', l))
      }
    }
  return r.jsx(B, {
    children: r.jsx(I, {
      children: r.jsxs(k, {
        noValidate: !0,
        validated: q,
        onSubmit: S,
        className: 'row g-3',
        children: [
          d == null
            ? void 0
            : d.map((e, i) =>
                r.jsx(
                  E,
                  {
                    sm: 6,
                    children: R.cloneElement(e.children, {
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
                  i,
                ),
              ),
          r.jsx(V, {
            className: 'text-end',
            children: r.jsx(W, {
              color: 'primary',
              loading: g,
              disabled: g,
              type: 'submit',
              children: 'Создать',
            }),
          }),
        ],
      }),
    }),
  })
}
export { ie as default }
