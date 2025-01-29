import pandas as pd
import numpy as np

# Caminho do arquivo
file_path = r'C:\Users\kaiut\Documents\code\Project\Backend\Report_1.xlsx'

# Carregar a planilha
planilha = pd.read_excel(file_path, sheet_name='Sheet1')

# Converter os dados da planilha para um array numpy
array_dados = planilha.to_numpy()

# Salvar o array em um arquivo .txt com colchetes e aspas em cada célula
output_file_path = r'C:\Users\kaiut\Documents\code\Project\Backend\array_dados_1.txt'
with open(output_file_path, 'w', encoding='utf-8') as file:
    for i, row in enumerate(array_dados):
        row_str = ','.join(f"'{str(cell)}'" for cell in row)
        if i < len(array_dados) - 1:
            file.write(f'[{row_str}],\n')
        else:
            file.write(f'[{row_str}]\n')

print(f"Dados salvos em {output_file_path}")
