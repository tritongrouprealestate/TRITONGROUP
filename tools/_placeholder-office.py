#!/usr/bin/env python3
"""Placeholder .xlsx and .pptx files. Marked PLACEHOLDER on every sheet/slide."""
import os, sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRONZE, INK, WARN = "A8762C", "111214", "BE3C28"

def out(rel):
    p = os.path.join(ROOT, rel); os.makedirs(os.path.dirname(p), exist_ok=True); return p

def xlsx(rel, title, cols, rows):
    wb = Workbook(); ws = wb.active; ws.title = "Sheet1"
    ws["A1"] = "PLACEHOLDER — REPLACE BEFORE USE"
    ws["A1"].font = Font(bold=True, color="FFFFFF", size=10)
    ws["A1"].fill = PatternFill("solid", fgColor=WARN)
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=len(cols))
    ws["A3"] = title; ws["A3"].font = Font(bold=True, size=15, color=INK)
    thin = Side(style="thin", color="D9D9D9")
    for c, name in enumerate(cols, 1):
        cell = ws.cell(row=5, column=c, value=name)
        cell.font = Font(bold=True, color="FFFFFF", size=10)
        cell.fill = PatternFill("solid", fgColor=BRONZE)
        cell.alignment = Alignment(horizontal="center", vertical="center")
    for r, row in enumerate(rows, 6):
        for c, v in enumerate(row, 1):
            cell = ws.cell(row=r, column=c, value=v)
            cell.border = Border(bottom=thin)
            if c > 1: cell.alignment = Alignment(horizontal="right")
    for c, name in enumerate(cols, 1):
        width = max(len(str(name)), *(len(str(row[c-1])) for row in rows)) + 6
        ws.column_dimensions[ws.cell(row=5, column=c).column_letter].width = width
    ws.freeze_panes = "A6"
    wb.save(out(rel)); print(f"  xlsx   {rel}")

def pptx(rel, title, subtitle, bullets):
    prs = Presentation(); prs.slide_width = Inches(13.333); prs.slide_height = Inches(7.5)
    def slide(layout=6):
        s = prs.slides.add_slide(prs.slide_layouts[layout])
        box = s.shapes.add_textbox(Inches(11.1), Inches(0.32), Inches(2.0), Inches(0.36))
        p = box.text_frame.paragraphs[0]; r = p.add_run(); r.text = "PLACEHOLDER"
        r.font.size = Pt(10); r.font.bold = True; r.font.color.rgb = RGBColor.from_string(WARN)
        return s
    s = slide()
    t = s.shapes.add_textbox(Inches(0.9), Inches(2.5), Inches(11), Inches(1.5)).text_frame
    t.text = title; t.paragraphs[0].runs[0].font.size = Pt(46)
    t.paragraphs[0].runs[0].font.bold = True
    t.paragraphs[0].runs[0].font.color.rgb = RGBColor.from_string(INK)
    st = s.shapes.add_textbox(Inches(0.95), Inches(3.9), Inches(11), Inches(0.8)).text_frame
    st.text = subtitle; st.paragraphs[0].runs[0].font.size = Pt(18)
    st.paragraphs[0].runs[0].font.color.rgb = RGBColor.from_string(BRONZE)
    for head, items in bullets:
        s2 = slide()
        h = s2.shapes.add_textbox(Inches(0.9), Inches(0.8), Inches(11), Inches(1)).text_frame
        h.text = head; h.paragraphs[0].runs[0].font.size = Pt(30)
        h.paragraphs[0].runs[0].font.bold = True
        h.paragraphs[0].runs[0].font.color.rgb = RGBColor.from_string(INK)
        b = s2.shapes.add_textbox(Inches(0.95), Inches(2.0), Inches(11.4), Inches(4)).text_frame
        b.word_wrap = True
        for i, it in enumerate(items):
            p = b.paragraphs[0] if i == 0 else b.add_paragraph()
            r = p.add_run(); r.text = "•  " + it
            r.font.size = Pt(17); r.font.color.rgb = RGBColor.from_string("3A3D44")
            p.space_after = Pt(13)
    prs.save(out(rel)); print(f"  pptx   {rel}")

PRICE = [["1 BHK", 452, 672, 4210000], ["2 BHK Compact", 684, 1015, 5720000],
         ["2 BHK Premium", 742, 1102, 6200000], ["3 BHK", 1038, 1540, 8670000],
         ["3 BHK Corner", 1104, 1638, 9180000]]

xlsx("collaterals/Sanvi/Cost Sheet/SANVI AERO GARDENS PRICE LIST.xlsx",
     "Sanvi Aero Gardens — Price List (placeholder)",
     ["Configuration", "Carpet (sq ft)", "SBA (sq ft)", "All-inclusive (₹)"], PRICE)

xlsx("collaterals/Sanvi/Availability Sheet/SANVI AERO GARDENS LATEST AVAILABILITY SHEET.xlsx",
     "Sanvi Aero Gardens — Availability (placeholder)",
     ["Unit", "Tower", "Floor", "Config", "Status"],
     [[f"{t}-{f:02d}0{u}", t, f, c, s]
      for t, f, u, c, s in [("A", 3, 1, "2 BHK", "Available"), ("A", 7, 2, "3 BHK", "Blocked"),
                            ("B", 4, 1, "1 BHK", "Available"), ("B", 9, 3, "3 BHK", "Sold"),
                            ("C", 2, 2, "2 BHK", "Available"), ("C", 11, 1, "3 BHK", "Available"),
                            ("D", 6, 4, "2 BHK", "Blocked"), ("D", 12, 2, "3 BHK", "Available")]])

xlsx("collaterals/Sanvi/Comparision Sheet/Comparison Sheet.xlsx",
     "Competitor Comparison (placeholder)",
     ["Project", "Distance", "Config", "Price / sq ft (₹)", "Possession"],
     [["Sanvi Aero Gardens", "—", "1/2/3 BHK", 6270, "Placeholder"],
      ["Competitor A", "2.1 km", "2/3 BHK", 6850, "Placeholder"],
      ["Competitor B", "3.4 km", "1/2 BHK", 5940, "Placeholder"],
      ["Competitor C", "4.8 km", "2/3 BHK", 7120, "Placeholder"]])

pptx("collaterals/Sanvi/Brochure/Sanvi Brochure PPT.pptx",
     "Sanvi Aero Gardens", "1, 2 & 3 BHK · Near Bengaluru Airport — placeholder deck",
     [("Why Sanvi", ["Placeholder positioning line", "Placeholder connectivity line",
                     "Placeholder amenity line", "Placeholder investment line"]),
      ("Configurations", ["1 BHK · 672 sq ft SBA", "2 BHK · 1,015 – 1,102 sq ft SBA",
                          "3 BHK · 1,540 – 1,638 sq ft SBA"]),
      ("Next steps", ["Replace this deck with the approved brochure PPT"])])

pptx("collaterals/Hummingvalley/Brochure/PPT - Humming valley.pptx",
     "Triton Humming Valley", "Luxury villas near Nandi Hills — placeholder deck",
     [("The setting", ["Placeholder elevation line", "Placeholder drive-time line",
                       "Placeholder landscape line"]),
      ("Villa typologies", ["2,400 sq ft plot · 3,150 built-up", "2,800 sq ft plot · 3,480 built-up",
                            "4,800 sq ft plot · 4,650 built-up"]),
      ("Next steps", ["Replace this deck with the approved brochure PPT"])])
