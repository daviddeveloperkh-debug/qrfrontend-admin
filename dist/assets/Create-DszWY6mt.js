import { n as w, r as y, j as a, B as m } from './index-bjzi2NvD.js'
import { w as M } from './modals-CKxuF1KC.js'
import { C as o, a as S } from './CFormInput-C336hbw-.js'
import { C as x } from './CDatePicker-C3Z-gM9k.js'
import { C as F } from './CCard-R4u2YyXY.js'
import { C as N } from './CCardBody-BY8Sxn6x.js'
import { C as B } from './CForm-DnX0btTe.js'
import { C as q } from './CRow-CndJ_9x5.js'
import { C as G } from './CCol-DszJQxcp.js'
import { C as P } from './CInputGroup-JE7GE1RW.js'
import { C as I } from './CCardFooter-D4YFsGe1.js'
import { C as L } from './CLoadingButton-CoARBVM3.js'
import { f as p, p as D } from './parse-n3RXTkBv.js'
import './auth-gSn_sS9R.js'
import './useForkedRef-CzJsXXcR.js'
import './CFocusTrap-CtPSLGIl.js'
import './DefaultLayout-DrDCyHef.js'
import './index.esm-BX2-GJNA.js'
const _ = () => {
  const g = w(),
    { create: j, createLoading: u } = M(),
    [t, h] = y.useState({}),
    [b, f] = y.useState(!1),
    l = (e) => {
      const { name: i, value: d } = e.target
      h({ ...t, [i]: d })
    },
    s = (e, i) => {
      h({ ...t, [e]: i })
    },
    c = [
      {
        label: 'Вводное заявление',
        children: a.jsx(o, { name: 'introStatement', value: t.introStatement, onChange: l }),
      },
      {
        label: 'Теорическая оценка',
        children: a.jsx(o, { name: 'theoryGrade', value: t.theoryGrade, onChange: l }),
      },
      {
        label: 'Практическая оценка',
        children: a.jsx(o, { name: 'practiceGrade', value: t.practiceGrade, onChange: l }),
      },
      {
        label: 'Детали квалификации',
        children: a.jsx(o, {
          name: 'qualificationDetails',
          value: t.qualificationDetails,
          onChange: l,
        }),
      },
      {
        label: 'Основание для выдачи',
        children: a.jsx(o, { name: 'issuanceBasis', value: t.issuanceBasis, onChange: l }),
      },
      {
        label: 'Орган выдачи',
        children: a.jsx(o, { name: 'issuingBody', value: t.issuingBody, onChange: l }),
      },
      { label: 'Город', children: a.jsx(o, { name: 'city', value: t.city, onChange: l }) },
      {
        label: 'Название сертификата',
        children: a.jsx(o, { name: 'certificatesName', value: t.certificatesName, onChange: l }),
      },
      {
        label: 'Номер сертификата',
        children: a.jsx(o, { name: 'certificateNo', value: t.certificateNo, onChange: l }),
      },
      {
        label: 'Дата выдачи',
        children: a.jsx(x, {
          date: t.issueDate ? new Date(t.issueDate) : null,
          inputDateParse: (e) => D(e, 'yyyy-MM-dd', new Date()),
          inputDateFormat: (e) => p(new Date(e), 'yyyy-MM-dd'),
          onDateChange: (e) => {
            if (e) {
              const i = p(new Date(e), 'yyyy-MM-dd')
              s('issueDate', i)
            } else s('issueDate', '')
          },
          placeholder: 'Выберите время',
          locale: 'en-US',
        }),
      },
      {
        label: 'Дата истечения',
        children: a.jsx(x, {
          date: t.expiryDate ? new Date(t.expiryDate) : null,
          inputDateParse: (e) => D(e, 'yyyy-MM-dd', new Date()),
          inputDateFormat: (e) => p(new Date(e), 'yyyy-MM-dd'),
          onDateChange: (e) => {
            if (e) {
              const i = p(new Date(e), 'yyyy-MM-dd')
              s('expiryDate', i)
            } else s('expiryDate', '')
          },
          placeholder: 'Выберите время',
          locale: 'en-US',
        }),
      },
    ],
    v = (e) => {
      if ((e.preventDefault(), e.currentTarget.checkValidity() === !1))
        e.preventDefault(),
          e.stopPropagation(),
          c
            .filter((r) => r.children.props.required)
            .map((r) => {
              var C
              const n = r.children.props.value
              ;((C = r.children.props.options) == null ? void 0 : C.length) > 0
                ? ((n == null ? void 0 : n.value) === void 0 ||
                    (n == null ? void 0 : n.value) === null ||
                    (n == null ? void 0 : n.value) === '') &&
                  m.error(`${r.label} - To\'ldiring`)
                : (n == null || n === '') && m.error(`${r.label} - To\'ldiring`)
            })
      else {
        const d = { ...t }
        f(!0),
          j(d)
            .then((r) => {
              var n
              r != null && r.success
                ? (m.success('Muvaffaqiyatli yaratildi'), g('/welder-certificates'), f(!1))
                : m.error((n = r == null ? void 0 : r.error) == null ? void 0 : n.message)
            })
            .catch((r) => console.log('err', r))
      }
    }
  return a.jsx(F, {
    children: a.jsx(N, {
      children: a.jsxs(B, {
        noValidate: !0,
        validated: b,
        onSubmit: v,
        children: [
          c == null
            ? void 0
            : c.map((e, i) =>
                a.jsxs(
                  q,
                  {
                    className: 'mb-3',
                    children: [
                      a.jsxs(S, {
                        className: 'col-sm-2 col-form-label',
                        children: [
                          e.label,
                          ' ',
                          e.children.props.required &&
                            a.jsx('span', { style: { color: 'red' }, children: '*' }),
                        ],
                      }),
                      a.jsx(G, { sm: 10, children: a.jsx(P, { children: e.children }) }),
                    ],
                  },
                  i,
                ),
              ),
          a.jsx(I, {
            className: 'text-end',
            children: a.jsx(L, {
              color: 'primary',
              loading: u,
              disabled: u,
              type: 'submit',
              children: 'Submit',
            }),
          }),
        ],
      }),
    }),
  })
}
export { _ as default }
