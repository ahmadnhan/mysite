import { useState } from 'react'
import moment from 'moment-hijri'
import './App.css'

function App() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [conversionType, setConversionType] = useState<'hijri-to-gregorian' | 'gregorian-to-hijri'>('hijri-to-gregorian')
  const [result, setResult] = useState('')

  // تحويل الأرقام العربية إلى إنجليزية
  function toEnglishDigits(str: string) {
    return str.replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660))
              .replace(/[\u06f0-\u06f9]/g, d => String(d.charCodeAt(0) - 0x06f0));
  }

  const handleConvert = () => {
    // تحويل الأرقام إلى إنجليزية قبل المعالجة
    const dayEn = toEnglishDigits(day)
    const monthEn = toEnglishDigits(month)
    const yearEn = toEnglishDigits(year)
    if (!dayEn || !monthEn || !yearEn) {
      setResult('يرجى إدخال اليوم والشهر والسنة')
      return
    }
    try {
      let output = ''
      let inputDate = ''
      if (conversionType === 'hijri-to-gregorian') {
        inputDate = `${yearEn}-${monthEn.padStart(2, '0')}-${dayEn.padStart(2, '0')}`
        const m = moment(inputDate, 'iYYYY-iMM-iDD')
        if (!m.isValid()) throw new Error('تاريخ هجري غير صحيح')
        output = m.format('YYYY-MM-DD')
      } else {
        inputDate = `${yearEn}-${monthEn.padStart(2, '0')}-${dayEn.padStart(2, '0')}`
        const m = moment(inputDate, 'YYYY-MM-DD')
        if (!m.isValid()) throw new Error('تاريخ ميلادي غير صحيح')
        output = m.format('iYYYY-iMM-iDD')
      }
      setResult(output)
    } catch (e: any) {
      setResult(e.message)
    }
  }

  return (
    <div className="container">
      <h1 className="title">محوّل التواريخ الهجري ↔ الميلادي</h1>
      <div className="converter-box">
        <div className="input-group">
          <label>أدخل اليوم والشهر والسنة ({conversionType === 'hijri-to-gregorian' ? 'هجري' : 'ميلادي'}):</label>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'row-reverse' }}>
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={e => setDay(e.target.value)}
              placeholder="اليوم"
              className="date-input"
              style={{ width: '33%' }}
            />
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={e => setMonth(e.target.value)}
              placeholder="الشهر"
              className="date-input"
              style={{ width: '33%' }}
            />
            <input
              type="number"
              min="1"
              max="9999"
              value={year}
              onChange={e => setYear(e.target.value)}
              placeholder="السنة"
              className="date-input"
              style={{ width: '34%' }}
            />
          </div>
        </div>
        <div className="button-group">
          <button
            className={conversionType === 'hijri-to-gregorian' ? 'active' : ''}
            onClick={() => setConversionType('hijri-to-gregorian')}
          >هجري ← ميلادي</button>
          <button
            className={conversionType === 'gregorian-to-hijri' ? 'active' : ''}
            onClick={() => setConversionType('gregorian-to-hijri')}
          >ميلادي ← هجري</button>
        </div>
        <button className="convert-btn" onClick={handleConvert}>تحويل</button>
        <div className="result">
          {result && <span>النتيجة: <b>{result}</b></span>}
        </div>
      </div>
      <footer className="footer">© {new Date().getFullYear()} جميع الحقوق محفوظة</footer>
    </div>
  )
}

export default App
