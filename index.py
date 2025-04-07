import pygame
import sys

# Inicializácia Pygame
pygame.init()

# Nastavenie obrazovky
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Kvízová Hra")

# Farby
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)

# Kategórie a hodnoty otázok
categories = ["FILMY", "VIDEOHRY", "SERIÁLY", "KNIHY A KOMIKSY", "DESKOVKY"]
questions_values = [20, 20, 20, 20, 40, 40, 40, 60, 60, 60]

# Hráči
players = ["Hráč 1", "Hráč 2", "Hráč 3"]
scores = [0, 0, 0]
current_player = 0

# Stav hry
game_state = "select_category"  # alebo "answer_question"

def draw_board():
    screen.fill(WHITE)
    
    # Vykreslenie kategórií
    for i, category in enumerate(categories):
        pygame.draw.rect(screen, BLUE, (50 + i*150, 50, 120, 60))
        font = pygame.font.SysFont(None, 24)
        text = font.render(category, True, WHITE)
        screen.blit(text, (50 + i*150 + 10, 70))
    
    # Vykreslenie hodnôt otázok
    for i, value in enumerate(questions_values):
        row = i // len(categories)
        col = i % len(categories)
        pygame.draw.rect(screen, GREEN, (50 + col*150, 120 + row*60, 120, 50))
        font = pygame.font.SysFont(None, 24)
        text = font.render(str(value), True, BLACK)
        screen.blit(text, (50 + col*150 + 50, 140 + row*60))
    
    # Vykreslenie skóre hráčov
    for i, (player, score) in enumerate(zip(players, scores)):
        color = RED if i == current_player else BLACK
        font = pygame.font.SysFont(None, 30)
        text = font.render(f"{player}: {score}", True, color)
        screen.blit(text, (50, 400 + i*40))

def main():
    global current_player
    
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if event.type == pygame.MOUSEBUTTONDOWN and game_state == "select_category":
                x, y = pygame.mouse.get_pos()
                
                # Kontrola kliknutia na otázku
                for i, value in enumerate(questions_values):
                    row = i // len(categories)
                    col = i % len(categories)
                    if (50 + col*150 <= x <= 50 + col*150 + 120 and 
                        120 + row*60 <= y <= 120 + row*60 + 50):
                        # Tu by sa zobrazila otázka a odpoveď
                        scores[current_player] += value
                        current_player = (current_player + 1) % len(players)
        
        draw_board()
        pygame.display.flip()
    
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()